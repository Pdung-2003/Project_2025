package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedbackId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "booking_id")  // Liên kết với Booking
    private Booking booking;  // Đảm bảo người dùng đã tham gia tour này và booking đã thanh toán

    @Column(nullable = false)
    private Integer rating;  // Đánh giá

    @Column(length = 1000)
    private String comment;  // Bình luận của khách hàng

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;  // Thời gian tạo

    @UpdateTimestamp
    private LocalDateTime updatedAt;  // Thời gian cập nhật
}
