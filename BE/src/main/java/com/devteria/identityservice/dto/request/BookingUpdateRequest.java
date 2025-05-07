package com.devteria.identityservice.dto.request;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingUpdateRequest implements Serializable {
    @Min(value = 1)
    private Integer numberOfPeople;
    private BigDecimal priceBooking;
    private LocalDate tourDate;
    private String requireFromCustomer;
}
