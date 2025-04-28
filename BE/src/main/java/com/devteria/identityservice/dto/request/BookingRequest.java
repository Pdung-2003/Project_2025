package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class BookingRequest {
    private Long customerId;  // Integer cho customerId
    private Long tourId;      // Integer cho tourId
    private String status;
    private Integer numberOfPeople; // Số lượng người tham gia tour
    private String tourDate;      // Ngày tour mà khách hàng mong muốn tham gia
}
