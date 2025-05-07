package com.devteria.identityservice.dto.request;

import lombok.*;

import java.io.Serializable;

@Builder
@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest implements Serializable {
    private Long customerId;  // Integer cho customerId
    private Long tourId;      // Integer cho tourId

    private Integer numberOfPeople; // Số lượng người tham gia tour
    private String requireFromCustomer;
}
