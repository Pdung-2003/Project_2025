package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.entity.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {

    @Mapping(target = "customer.id", source = "customerId")
    @Mapping(target = "tour.tourId", source = "tourId")
    @Mapping(target = "booking.bookingId", source = "bookingId")
    Feedback toEntity(FeedbackRequest request);

    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "tourId", source = "tour.tourId")
    @Mapping(target = "bookingId", source = "booking.bookingId")
    FeedbackResponse toResponse(Feedback feedback);
}
