package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class BookingRequest {
    private Integer customerId;
    private Integer tourId;
    private String status;
}