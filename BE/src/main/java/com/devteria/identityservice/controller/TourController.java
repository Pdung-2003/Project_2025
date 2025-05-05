package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.service.CloudinaryService;
import com.devteria.identityservice.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;
    @Autowired
    private CloudinaryService cloudinaryService;
    // Tạo tour mới
    @PostMapping
    public ResponseEntity<TourResponse> createTour(@ModelAttribute TourRequest request) throws IOException {
        String imageUrl = cloudinaryService.upload(request.getTourBanner());
        TourResponse tourResponse = tourService.createTour(request, imageUrl);
        return ResponseEntity.ok(tourResponse);
    }


    // Lấy tất cả các tour
    @GetMapping
    public ResponseEntity<List<TourResponse>> getTours(@RequestParam(required = false) Long managerId) {
        List<TourResponse> tours;
        if (managerId != null) {
            tours = tourService.getToursByManagerId(managerId);
        } else {
            tours = tourService.getAllTours(); // Nếu không có managerId, lấy tất cả các tour
        }
        return ResponseEntity.ok(tours);
    }

    // Lấy tour theo tourId
    @GetMapping("/{tourId}")
    public ResponseEntity<TourResponse> getTour(@PathVariable Long tourId) {
        return ResponseEntity.ok(tourService.getTourById(tourId));
    }


    // Lấy tất cả các tour theo managerId
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<TourResponse>> getToursByManagerId(@PathVariable Long managerId) {
        List<TourResponse> tours = tourService.getToursByManagerId(managerId);
        return ResponseEntity.ok(tours);
    }

    // Lấy tất cả các tour theo companyName
    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<TourResponse>> getToursByCompanyName(@PathVariable String companyName) {
        List<TourResponse> tours = tourService.getToursByCompanyName(companyName);
        return ResponseEntity.ok(tours);
    }

    // Cập nhật tour
    @PutMapping("/{tourId}")
    public ResponseEntity<TourResponse> updateTour(@PathVariable Long tourId, @RequestBody TourRequest tourRequest) {
        TourResponse updatedTour = tourService.updateTour(tourId, tourRequest);
        return ResponseEntity.ok(updatedTour);
    }

    // Xóa tour
    @DeleteMapping("/{tourId}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.noContent().build();
    }
}
