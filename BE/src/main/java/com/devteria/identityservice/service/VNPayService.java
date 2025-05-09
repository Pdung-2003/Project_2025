package com.devteria.identityservice.service;

import com.devteria.identityservice.configuration.VNPayConfiguration;
import com.devteria.identityservice.dto.response.VnPayResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Payment;
import com.devteria.identityservice.repository.PaymentRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Slf4j(topic = "VNPay-Service")
@RequiredArgsConstructor
public class VNPayService {

    private final BookingService bookingService;
    private final PaymentRepository paymentRepository;

    public String createPayment(Booking booking) throws UnsupportedEncodingException {
        String vnpVersion = "2.1.0";
        String vnpCommand = "pay";
        String orderType = "other";
        long amount = booking.getPriceBooking().multiply(BigDecimal.valueOf(100L)).longValue();

        String vnpTxnRef = VNPayConfiguration.getRandomNumber(10);
        String vnpIpAddr = "127.0.0.1";
        String vnpTmnCode = VNPayConfiguration.VNP_TMN_CODE;

        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version", vnpVersion);
        vnpParams.put("vnp_Command", vnpCommand);
        vnpParams.put("vnp_TmnCode", vnpTmnCode);
        vnpParams.put("vnp_Amount", String.valueOf(amount));
        vnpParams.put("vnp_CurrCode", "VND");
        vnpParams.put("vnp_TxnRef", vnpTxnRef);
        vnpParams.put("vnp_OrderInfo", "Thanh toan hoa don " + booking.getBookingCode());
        vnpParams.put("vnp_OrderType", orderType);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", VNPayConfiguration.VNP_RETURN_URL);
        vnpParams.put("vnp_IpAddr", vnpIpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnpCreateDate = formatter.format(cld.getTime());
        vnpParams.put("vnp_CreateDate", vnpCreateDate);

        cld.add(Calendar.MINUTE, 30);
        String vnpExpireDate = formatter.format(cld.getTime());
        vnpParams.put("vnp_ExpireDate", vnpExpireDate);

        List fieldNames = new ArrayList(vnpParams.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = String.valueOf(vnpParams.get(fieldName));
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnpSecureHash = VNPayConfiguration.hmacSHA512(VNPayConfiguration.SECRET_KEY, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        return VNPayConfiguration.VNP_PAYURL + "?" + queryUrl;
    }

    public VnPayResponse handleCallback(HttpServletRequest request) {
        VnPayResponse vnPayResponse = new VnPayResponse();

        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII);
            String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        //Check checksum
        String signValue = VNPayConfiguration.hashAllFields(fields);

        if (signValue.equals(vnp_SecureHash)) {
            String vnp_TxnRef = request.getParameter("vnp_TxnRef");
            String vnp_OrderInfo = request.getParameter("vnp_OrderInfo");
            String vnpTransactionNo = request.getParameter("vnp_TransactionNo");
            String bookingCode = vnp_OrderInfo.substring("Thanh toan hoa don ".length());
            long amount = Long.parseLong(request.getParameter("vnp_Amount")) / 100;

            Booking booking = bookingService.getBooking(bookingCode);
            if (booking != null) {
                if (amount == booking.getPriceBooking().longValue()) {
                    Payment payment = paymentRepository.findByBookingCodeAndTransRef(bookingCode, vnp_TxnRef);
                    payment.setTransactionId(vnpTransactionNo);
                    Payment.PaymentStatus transactionStatus = payment.getPaymentStatus();

                    if (!transactionStatus.equals(Payment.PaymentStatus.PAID)) {
                        if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                            String vnpPayDate = request.getParameter("vnp_PayDate");
                            LocalDateTime payDate = convertToLocalDateTime(vnpPayDate);
                            payment.setPaymentDate(payDate);
                            payment.setPaymentStatus(Payment.PaymentStatus.PAID);
                            bookingService.changeStatusBooking(booking, Booking.Status.PAID);
                        } else {
                            payment.setPaymentStatus(Payment.PaymentStatus.FAILED);
                        }
                        vnPayResponse.setMessage("Confirm Success");
                        vnPayResponse.setRspCode("00");
                    } else {
                        vnPayResponse.setMessage("Order already confirmed");
                        vnPayResponse.setRspCode("02");
                    }

                    paymentRepository.save(payment);
                } else {
                    vnPayResponse.setMessage("Invalid Amount");
                    vnPayResponse.setRspCode("04");
                }
            } else {
                vnPayResponse.setMessage("Order not Found");
                vnPayResponse.setRspCode("01");
            }
        } else {
            vnPayResponse.setMessage("Invalid Checksum");
            vnPayResponse.setRspCode("97");
        }

        return vnPayResponse;
    }

    public boolean checksum(HttpServletRequest request) {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = (String) params.nextElement();
            String fieldValue = !fieldName.equals("vnp_OrderInfo")
                    ? request.getParameter(fieldName)
                    : request.getParameter(fieldName).replaceAll(" ", "+");
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                if (!fieldName.equals("paymentType")) {
                    fields.put(fieldName, fieldValue);
                }
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }

        String signValue = VNPayConfiguration.hashAllFields(fields);
        boolean flag = signValue.equals(vnp_SecureHash);

        if (flag) {
            String vnpTxnRef = request.getParameter("vnp_TxnRef");
            String vnpOrderInfo = request.getParameter("vnp_OrderInfo");
            String vnpTransactionNo = request.getParameter("vnp_TransactionNo");
            String vnpPayDate = request.getParameter("vnp_PayDate");
            LocalDateTime payDate = convertToLocalDateTime(vnpPayDate);
            String bookingCode = vnpOrderInfo.substring("Nap tien cho nguoi dung ".length());
            Booking booking = bookingService.getBooking(bookingCode);
            Payment payment = paymentRepository.findByBookingCodeAndTransRef(bookingCode, vnpTxnRef);
            payment.setTransactionId(vnpTransactionNo);
            if (!payment.getPaymentStatus().equals(Payment.PaymentStatus.PAID)) {
                if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                    payment.setPaymentDate(payDate);
                    payment.setPaymentStatus(Payment.PaymentStatus.PAID);
                    bookingService.changeStatusBooking(booking, Booking.Status.PAID);
                } else {
                    payment.setPaymentStatus(Payment.PaymentStatus.FAILED);
                }
            }
            paymentRepository.save(payment);
        }

        return flag;
    }

    private LocalDateTime convertToLocalDateTime(String dateTimeString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return LocalDateTime.parse(dateTimeString, formatter);
    }

}
