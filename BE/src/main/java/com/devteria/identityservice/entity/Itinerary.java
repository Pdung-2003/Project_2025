package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itineraryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id",nullable = false)
    @ToString.Exclude
    private Tour tour;  // Tham chiếu đến bảng Tours

    @Column(nullable = false)
    private Integer dayNumber;

    @Column(nullable = false, length = 1024)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", name = "activity_description")
    private String activityDescription;  // Mô tả hoạt động trong lịch trình

    private String location;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;  // Thời gian tạo

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;  // Thời gian cập nhật
}
