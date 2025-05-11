package com.devteria.identityservice.dto.request;

import com.devteria.identityservice.entity.Tour;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TourFilterRequest implements Serializable { private String tourName = "";
    private String location = "";
    private String destination = "";
    private LocalDate startDateFrom = LocalDate.of(1, 12, 31);
    private LocalDate startDateTo = LocalDate.of(9999,12,31);
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Tour.Status status;
    private Long managerId;
    private String company = "";
    private String sortBy;  // [field1:direction1,field2:direction2] VD:startDate:desc,price:asc
    private String sortDirection = "asc";

    @Min(value = 0)
    private Integer pageNumber = 0;
    @Min(value = 1)
    private Integer pageSize = 10;
}
