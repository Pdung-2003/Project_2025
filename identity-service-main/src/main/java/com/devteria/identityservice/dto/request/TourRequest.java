package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class TourRequest {
    private String tourName;
    private String description;
    private Double price;
    private Integer managerId;
}
