package com.devteria.identityservice.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ItineraryRequest {
    private Long tourId;  // tourId tham chiếu đến tour
    private LocalDate date;  // Ngày lịch trình
    private String activityDescription;  // Mô tả hoạt động trong lịch trình
}
