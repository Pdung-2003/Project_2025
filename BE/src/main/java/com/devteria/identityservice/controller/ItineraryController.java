package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.service.ItineraryService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ItineraryController {

    ItineraryService itineraryService;

    @PostMapping
    public ItineraryResponse createItinerary(@RequestBody ItineraryRequest request) {
        return itineraryService.createItinerary(request);
    }

    @GetMapping("/tour/{tourId}")
    public List<ItineraryResponse> getItinerariesByTourId(@PathVariable Long tourId) {
        return itineraryService.getItinerariesByTourId(tourId);
    }

    @DeleteMapping("/{itineraryId}")
    public void deleteItinerary(@PathVariable Integer itineraryId) {
        itineraryService.deleteItinerary(itineraryId);
    }
}
