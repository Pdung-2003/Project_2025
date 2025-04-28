package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.mapper.TourMapper;
import com.devteria.identityservice.repository.TourRepository;
import com.devteria.identityservice.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    // Tạo mới tour
    public TourResponse createTour(TourRequest tourRequest) {
        Tour tour = tourMapper.toEntity(tourRequest);

        // Lấy manager từ UserRepository dựa trên managerId trong DTO
        tour.setManager(userRepository.findById(tourRequest.getManagerId())
                .orElseThrow(() -> new RuntimeException("Manager not found")));

        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }

    // Lấy tour theo managerId
    public List<TourResponse> getToursByManagerId(Long managerId) {
        List<Tour> tours = tourRepository.findByManagerId(managerId);
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }

    // Lấy tour theo companyName
    public List<TourResponse> getToursByCompanyName(String companyName) {
        List<Tour> tours = tourRepository.findByCompanyName(companyName);
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }

    // Cập nhật tour
    public TourResponse updateTour(Long tourId, TourRequest tourRequest) {
        Tour existingTour = tourRepository.findById(tourId).orElseThrow(() -> new RuntimeException("Tour not found"));
        Tour tour = tourMapper.toEntity(tourRequest);
        tour.setTourId(tourId);
        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }

    // Xóa tour
    public void deleteTour(Long tourId) {
        tourRepository.deleteById(tourId);
    }

    // Lấy tất cả tour
    public List<TourResponse> getAllTours() {
        List<Tour> tours = tourRepository.findAll();
        return tours.stream().map(tourMapper::toResponse).collect(Collectors.toList());
    }
}
