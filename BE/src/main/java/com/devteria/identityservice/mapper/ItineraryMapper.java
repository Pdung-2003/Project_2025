package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.entity.Itinerary;
import com.devteria.identityservice.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItineraryMapper {

    @Mapping(target = "tour.tourId", source = "tourId")  // ánh xạ tourId vào tour
    Itinerary toEntity(ItineraryRequest itineraryRequest);

    @Mapping(target = "tourId", source = "tour.tourId")  // ánh xạ tourId từ entity sang DTO
    ItineraryResponse toResponse(Itinerary itinerary);
}
