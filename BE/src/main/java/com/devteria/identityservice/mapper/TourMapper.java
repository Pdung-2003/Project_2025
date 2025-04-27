package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TourMapper {

    @Mapping(target = "manager.id", source = "managerId")
    Tour toEntity(TourRequest tourRequest);

    @Mapping(target = "managerId", source = "manager.id")
    TourResponse toResponse(Tour tour);
}
