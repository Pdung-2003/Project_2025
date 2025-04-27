package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    @PostMapping
    public ResponseEntity<TourResponse> createTour(@RequestBody TourRequest tourRequest) {
        TourResponse tourResponse = tourService.createTour(tourRequest);
        return ResponseEntity.ok(tourResponse);
    }

    @GetMapping
    public ResponseEntity<List<TourResponse>> getTours() {
        List<TourResponse> tours = tourService.getToursByManagerId(null); // Fetch all tours (optional)
        return ResponseEntity.ok(tours);
    }

    @GetMapping("/{tourId}")
    public ResponseEntity<TourResponse> getTour(@PathVariable Long tourId) {
        TourResponse tourResponse = tourService.getToursByManagerId(tourId).get(0); // Fetch by ID (simplified)
        return ResponseEntity.ok(tourResponse);
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<TourResponse>> getToursByManagerId(@PathVariable Long managerId) {
        List<TourResponse> tours = tourService.getToursByManagerId(managerId);
        return ResponseEntity.ok(tours);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<TourResponse>> getToursByCompanyName(@PathVariable String companyName) {
        List<TourResponse> tours = tourService.getToursByCompanyName(companyName);
        return ResponseEntity.ok(tours);
    }

    @PutMapping("/{tourId}")
    public ResponseEntity<TourResponse> updateTour(@PathVariable Long tourId, @RequestBody TourRequest tourRequest) {
        TourResponse updatedTour = tourService.updateTour(tourId, tourRequest);
        return ResponseEntity.ok(updatedTour);
    }

    @DeleteMapping("/{tourId}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.noContent().build();
    }
}
