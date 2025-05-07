package com.devteria.identityservice.dto.request;

import com.devteria.identityservice.entity.Tour;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TourRequest {
    private String tourCode;
    private String tourName;
    //private String tourBanner;
    private String description;
    private String duration; // Ví dụ: 3N2Đ
    private String location;
    private String destination;
    private BigDecimal price;
    private Double discount;
    private Long managerId; // managerId để ánh xạ với User entity
    private String companyName;
    private Integer maxCapacity;
    private LocalDate startDate;
    private LocalDate endDate;
    private Tour.Status status;
}
