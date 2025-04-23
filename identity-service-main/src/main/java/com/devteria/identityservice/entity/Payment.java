package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)  // Liên kết với bảng Booking
    private Booking booking;

    @Column(nullable = false)
    private BigDecimal amount;  // Sử dụng BigDecimal cho tiền tệ

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;  // Phương thức thanh toán

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;  // Trạng thái thanh toán

    @Column(nullable = false)
    private Timestamp paymentDate;  // Thời gian thanh toán

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;  // Thời gian tạo

    @Column(nullable = false)
    private Timestamp updatedAt;  // Thời gian cập nhật

    @PrePersist
    public void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }

    public enum PaymentMethod {
        CREDIT_CARD, PAYPAL, BANK_TRANSFER  // Các phương thức thanh toán
    }

    public enum PaymentStatus {
        PAID, PENDING, FAILED  // Các trạng thái thanh toán
    }
}
