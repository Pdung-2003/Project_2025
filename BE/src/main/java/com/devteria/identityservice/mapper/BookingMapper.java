package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mapping(target = "customer.id", source = "customerId")  // customerId sử dụng Long
    @Mapping(target = "tour.tourId", source = "tourId")      // tourId sử dụng Long
    @Mapping(target = "status", source = "status")
    @Mapping(target = "tourDate", source = "tourDate")
    Booking toEntity(BookingRequest bookingRequest);

    @Mapping(target = "customerId", source = "customer.id")  // customerId sử dụng Long
    @Mapping(target = "tourId", source = "tour.tourId")      // tourId sử dụng Long
    BookingResponse toResponse(Booking booking);
}
