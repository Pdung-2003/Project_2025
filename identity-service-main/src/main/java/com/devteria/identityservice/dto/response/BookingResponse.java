// BookingResponse.java
package com.devteria.identityservice.dto.response;

import lombok.Data;

@Data
public class BookingResponse {
    private Integer bookingId;
    private Integer customerId;
    private Integer tourId;
    private String status;
    private String bookingDate;
    private String createdAt;
    private String updatedAt;
}
