package com.devteria.identityservice.dto.request;

import com.devteria.identityservice.entity.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingFilterRequest {
    private Integer userId;
    private Integer tourId;
    private String bookingCode = "";
    private Booking.Status status;
    private LocalDate fromDate = LocalDate.of(1, 12, 31);
    private LocalDate toDate = LocalDate.of(9999, 12, 31);
    private Boolean isTicketSent;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer managerId;
    private Integer pageNumber = 0;
    private Integer pageSize = 10;
    private List<SortField> sort;
}
