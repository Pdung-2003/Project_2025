package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itineraryId;

    @ManyToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "tourId")
    private Tour tour;  // Tham chiếu đến bảng Tours

    @Column(nullable = false)
    private LocalDate date;  // Ngày của lịch trình

    @Column(nullable = false)
    private String activityDescription;  // Mô tả hoạt động trong lịch trình

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;  // Thời gian tạo

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedAt;  // Thời gian cập nhật
}
