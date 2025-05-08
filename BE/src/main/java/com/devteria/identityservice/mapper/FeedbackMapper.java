package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.entity.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {

    Feedback toFeedback(FeedbackRequest request);

    @Mapping(target = "bookingId", source = "booking.bookingId")
    @Mapping(target = "tourId", source = "tour.tourId")
    @Mapping(target = "userId", source = "customer.id")
    @Mapping(target = "userFullname", source = "customer.fullName")
    FeedbackResponse toResponse(Feedback feedback);
}
