package com.devteria.identityservice.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItineraryRequest implements Serializable {

    @NotNull
    @Min(value = 1)
    private Long tourId;

    @NotNull
    @Min(value = 1)
    private Integer dayNumberOfTour;

    private String title;
    private String activityDescription;

    @NotBlank
    private String location;
}
