package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.response.PaginationResponse;
import com.devteria.identityservice.dto.response.PaymentResponse;
import com.devteria.identityservice.dto.response.PaymentUrlResponse;
import com.devteria.identityservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j(topic = "Payment-Controller")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/booking/{bookingId}")
    public ResponseEntity<ApiResponse<PaymentUrlResponse>> createPaymentForBooking(@PathVariable Integer bookingId) {
        log.info("Generate payment url for booking with id: {}", bookingId);
        return ResponseEntity.ok().body(
                ApiResponse.<PaymentUrlResponse>builder()
                        .result(new PaymentUrlResponse(paymentService.createPaymentUrl(bookingId)))
                        .build()
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getAllPayment(
            @RequestParam(required = false, defaultValue = "0") Integer pageNumber,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {
        log.info("API get all payment");
        Page<PaymentResponse> responsePage = paymentService.getAll(pageNumber, pageSize);
        return ResponseEntity.ok().body(
                ApiResponse.<List<PaymentResponse>>builder()
                        .result(responsePage.getContent())
                        .pagination(new PaginationResponse(responsePage))
                        .build()
        );
    }
    @GetMapping("/booking/{bookingCode}")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPaymentForBooking(@PathVariable String bookingCode) {
        log.info("Get list payment for booking id: {}", bookingCode);

        return ResponseEntity.ok().body(
                ApiResponse.<List<PaymentResponse>>builder()
                        .result(paymentService.getPaymentsForBooking(bookingCode))
                        .build()
        );
    }
}
