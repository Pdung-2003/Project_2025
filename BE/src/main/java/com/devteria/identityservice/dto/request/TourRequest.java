package com.devteria.identityservice.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TourRequest {
    private String tourCode;
    private String tourName;
    private String tourBanner;
    private String description;
    private Double price;
    private Integer managerId; // managerId để ánh xạ với User entity
    private String companyName;
    private String location;
    private Integer totalTicket;
    private Integer availableTicket;
    private Integer soldTicket;
    private LocalDate startDate;
    private LocalDate endDate;
}
