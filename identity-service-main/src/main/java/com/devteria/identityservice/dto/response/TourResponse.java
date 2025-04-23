// TourResponse.java
package com.devteria.identityservice.dto.response;

import lombok.Data;

@Data
public class TourResponse {
    private Integer tourId;
    private String tourName;
    private String description;
    private Double price;
    private Integer managerId;
    private String createdAt;
    private String updatedAt;
}