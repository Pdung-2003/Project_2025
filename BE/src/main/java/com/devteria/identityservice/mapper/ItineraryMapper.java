package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.entity.Itinerary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {

    @Mapping(target = "tour", ignore = true)
    @Mapping(target = "dayNumber", source = "dayNumberOfTour")
    Itinerary toItinerary(ItineraryRequest request);

    @Mapping(target = "dayNumberOfTour", source = "dayNumber")
    @Mapping(target = "tourId", source = "tour.tourId")
    ItineraryResponse toItineraryResponse(Itinerary itinerary);
}
