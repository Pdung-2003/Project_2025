package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Liên kết với bảng User (khách hàng)
    private User customer;  // Customer là một User trong hệ thống

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)  // Liên kết với bảng Tour
    private Tour tour;

    @Column(nullable = false)
    private Timestamp bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;  // Trạng thái của booking

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp updatedAt;

    public enum Status {
        PENDING, CONFIRMED, CANCELLED  // Trạng thái của booking
    }

    @PrePersist
    public void onCreate() {
        // Set createdAt và updatedAt trước khi lưu mới
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    public void onUpdate() {
        // Set updatedAt mỗi khi cập nhật
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }
}
