package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.response.PaymentResponse;
import com.devteria.identityservice.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "bookingCode", source = "booking.bookingCode")
    PaymentResponse toPaymentResponse(Payment payment);
}
