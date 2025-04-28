package com.devteria.identityservice.dto.response;

import lombok.Data;

@Data
public class BookingResponse {
    private Integer bookingId;  // Integer cho bookingId
    private Long customerId; // Integer cho customerId
    private Long tourId;     // Integer cho tourId
    private String status;
    private String bookingDate;
    private String createdAt;
    private String updatedAt;
}
