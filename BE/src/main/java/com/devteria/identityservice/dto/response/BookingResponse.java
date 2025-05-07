package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.Booking;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingResponse implements Serializable {
    private Integer bookingId;  // Integer cho bookingId
    private Long customerId; // Integer cho customerId
    private Long tourId;     // Integer cho tourId
    private String tourName;
    private String bookingCode;
    private Integer numberOfPeople;
    private BigDecimal priceBooking;
    private LocalDate tourDate;
    private Booking.Status status;
    private String requireFromCustomer;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
