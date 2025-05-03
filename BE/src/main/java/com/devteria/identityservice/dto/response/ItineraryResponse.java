package com.devteria.identityservice.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ItineraryResponse {
    private Integer itineraryId;  // id của lịch trình
    private Long tourId;  // tourId tham chiếu đến tour
    private LocalDate date;  // Ngày lịch trình
    private String activityDescription;  // Mô tả hoạt động trong lịch trình
    private String createdAt;  // Thời gian tạo
    private String updatedAt;  // Thời gian cập nhật
}
