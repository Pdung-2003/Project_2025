package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.Payment;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse implements Serializable {

    private Integer paymentId;
    private String bookingCode;
    private BigDecimal amount;
    private Payment.PaymentStatus paymentStatus;
    private String transactionRef;
    private String transactionId;
    private LocalDateTime paymentDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
