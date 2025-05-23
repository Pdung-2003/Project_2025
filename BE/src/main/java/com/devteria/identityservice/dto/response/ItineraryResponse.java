package com.devteria.identityservice.dto.response;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItineraryResponse implements Serializable {
    private Integer itineraryId;
    private Long tourId;
    private Integer dayNumberOfTour;
    private String title;
    private String activityDescription;
    private String location;
    private List<ImagePathResponse> images;
}
