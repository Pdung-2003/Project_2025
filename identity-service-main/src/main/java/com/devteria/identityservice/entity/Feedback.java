package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedbackId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)  // Liên kết với bảng User (khách hàng)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)  // Liên kết với bảng Tours
    private Tour tour;

    @Column(nullable = false)
    private Integer rating;  // Đánh giá

    private String comment;  // Bình luận của khách hàng

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;  // Thời gian tạo

    @Column(nullable = false)
    private java.sql.Timestamp updatedAt;  // Thời gian cập nhật
}
