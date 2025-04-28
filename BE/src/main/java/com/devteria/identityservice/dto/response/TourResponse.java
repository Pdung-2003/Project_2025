package com.devteria.identityservice.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TourResponse {
    private Long tourId; // `Long` thay vì `Integer` để phù hợp với kiểu dữ liệu của tourId trong Entity
    private String tourCode;
    private String tourName;
    private String tourBanner;
    private String description;
    private Double price;
    private Long managerId;
    private String companyName;
    private String location;
    private Integer totalTicket;
    private Integer availableTicket;
    private Integer soldTicket;
    private LocalDate startDate;
    private LocalDate endDate;
    private String createdAt;
    private String updatedAt;
}
