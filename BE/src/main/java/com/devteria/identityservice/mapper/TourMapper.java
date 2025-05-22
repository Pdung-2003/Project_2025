package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.ManagerDataResponse;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TourMapper {

    @Mapping(target = "manager", ignore = true)
    Tour toEntity(TourRequest tourRequest);

    @Mapping(target = "manager", expression = "java(buildManagerDataTour(tour))")
    TourResponse toResponse(Tour tour);

    default Tour updateTour(TourRequest request, Tour existTour) {
        existTour.setTourCode(request.getTourCode());
        existTour.setTourName(request.getTourName());
        existTour.setDescription(request.getDescription());
        existTour.setDuration(request.getDuration());
        existTour.setLocation(request.getLocation());
        existTour.setDestination(request.getDestination());
        existTour.setPrice(request.getPrice());
        existTour.setDiscount(request.getDiscount());
        existTour.setCompanyName(request.getCompanyName());
        existTour.setMaxCapacity(request.getMaxCapacity());
        existTour.setStartDate(request.getStartDate());
        existTour.setEndDate(request.getEndDate());
        existTour.setStatus(request.getStatus());

        return existTour;
    }

    default ManagerDataResponse buildManagerDataTour(Tour tour) {
        User manager = tour.getManager();
        return ManagerDataResponse.builder()
                .managerId(manager.getId())
                .fullName(manager.getFullName())
                .dob(manager.getBirthDate())
                .build();
    }
}
