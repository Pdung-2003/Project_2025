package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
    private java.sql.Date date;  // Ngày của lịch trình

    @Column(nullable = false)
    private String activityDescription;  // Mô tả hoạt động trong lịch trình

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;  // Thời gian tạo

    @Column(nullable = false)
    private java.sql.Timestamp updatedAt;  // Thời gian cập nhật
}
