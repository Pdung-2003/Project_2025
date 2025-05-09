package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.response.PaymentResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Payment;
import com.devteria.identityservice.exception.BadRequestException;
import com.devteria.identityservice.mapper.PaymentMapper;
import com.devteria.identityservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j(topic = "Payment-Service")
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentMapper paymentMapper;

    private final PaymentRepository paymentRepository;
    private final VNPayService vnPayService;
    private final BookingService bookingService;

    @Transactional(rollbackFor = Exception.class)
    public String createPaymentUrl(Integer bookingId) {
        Booking booking = bookingService.getBooking(bookingId);
        if (!booking.getStatus().equals(Booking.Status.CONFIRMED)) {
            throw new BadRequestException("Failed to generate payment url for the booking");
        }

        try {
            String url = vnPayService.createPayment(booking);
            String vnpTxnRef = getQueryParam(url, "vnp_TxnRef");
            createPayment(booking, vnpTxnRef);
            return url;
        } catch (Exception e) {
            log.error("Can't not create payment url, e: {}", e.getMessage());
            throw new BadRequestException("Failed to generate payment url for the booking");
        }
    }


    @Transactional(readOnly = true)
    public List<PaymentResponse> getPaymentsForBooking(String bookingCode) {
        Booking booking = bookingService.getBooking(bookingCode);
        List<Payment> paymentList = paymentRepository.findAllByBooking(booking);

        return paymentList.stream().map(paymentMapper::toPaymentResponse).toList();
    }

    @Transactional(readOnly = true)
    public Page<PaymentResponse> getAll(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Payment> paymentPage = paymentRepository.findAll(pageable);
        return paymentPage.map(paymentMapper::toPaymentResponse);
    }

    public void createPayment(Booking booking, String vnpTxnRef) {
        Payment payment = Payment.builder()
                .booking(booking)
                .amount(booking.getPriceBooking())
                .paymentStatus(Payment.PaymentStatus.PENDING)
                .transactionRef(vnpTxnRef)
                .build();

        paymentRepository.save(payment);
    }

    private String getQueryParam(String url, String paramName) {
        if (url == null || !url.contains("?")) {
            return null;
        }

        return Arrays.stream(url.split("\\?")[1].split("&"))
                .filter(param -> param.startsWith(paramName + "="))
                .map(param -> param.split("=", 2)[1])
                .findFirst()
                .orElse(null);
    }
}
