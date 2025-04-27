package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.mapper.TourMapper;
import com.devteria.identityservice.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private TourMapper tourMapper;

    public TourResponse createTour(TourRequest tourRequest) {
        Tour tour = tourMapper.toEntity(tourRequest);
        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }

    public List<TourResponse> getToursByManagerId(Long managerId) {
        List<Tour> tours = tourRepository.findByManagerId(managerId);
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }

    public List<TourResponse> getToursByCompanyName(String companyName) {
        List<Tour> tours = tourRepository.findByCompanyName(companyName);
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }

    public List<TourResponse> getToursByManagerIdAndCompanyName(Long managerId, String companyName) {
        List<Tour> tours = tourRepository.findByManagerIdAndCompanyName(managerId, companyName);
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }

    public TourResponse updateTour(Long tourId, TourRequest tourRequest) {
        Tour existingTour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
        Tour tour = tourMapper.toEntity(tourRequest);
        tour.setTourId(tourId); // Set the ID to update the existing tour
        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }

    public void deleteTour(Long tourId) {
        tourRepository.deleteById(tourId);
    }
}
