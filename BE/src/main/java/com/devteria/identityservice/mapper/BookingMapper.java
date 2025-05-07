package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.request.BookingUpdateRequest;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    Booking toEntity(BookingRequest bookingRequest);

    @Mapping(target = "customerId", source = "customer.id")  // customerId sử dụng Long
    @Mapping(target = "tourId", source = "tour.tourId")      // tourId sử dụng Long
    @Mapping(target = "tourName", source = "tour.tourName")
    BookingResponse toResponse(Booking booking);

    default Booking toEntityByUpdateRequest(BookingUpdateRequest request, Booking booking){
        if(request.getPriceBooking() != null) {
            booking.setPriceBooking(request.getPriceBooking());
        }
        if (request.getTourDate() != null) {
            booking.setTourDate(request.getTourDate());
        }
        if (request.getNumberOfPeople() != null && request.getNumberOfPeople() > 0){
            booking.setNumberOfPeople(request.getNumberOfPeople());
        }
        if (request.getRequireFromCustomer() != null && !request.getRequireFromCustomer().isEmpty()) {
            booking.setRequireFromCustomer(request.getRequireFromCustomer());
        }
        return booking;
    }
}
