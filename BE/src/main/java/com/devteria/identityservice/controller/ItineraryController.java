package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.service.ItineraryService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j(topic = "Itinerary-Controller")
@RestController
@RequestMapping("/api/itineraries")
@RequiredArgsConstructor
public class ItineraryController {

    private final ItineraryService itineraryService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ItineraryResponse>> createItinerary(@RequestBody ItineraryRequest request) {
        log.info("API add itinerary for tour with id: {}", request.getTourId());

        ApiResponse<ItineraryResponse> apiResponse = ApiResponse.<ItineraryResponse>builder()
                .result(itineraryService.create(request))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @PutMapping("/{itineraryId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ItineraryResponse>> updateItinerary(@RequestBody ItineraryRequest request,
                                                                          @PathVariable @Min(1) Integer itineraryId
    ) {
        log.info("API update itinerary with id: {}", itineraryId);

        ApiResponse<ItineraryResponse> apiResponse = ApiResponse.<ItineraryResponse>builder()
                .result(itineraryService.update(itineraryId, request))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @DeleteMapping("/{itineraryId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateItinerary(@PathVariable @Min(1) Integer itineraryId) {
        log.info("API delete itinerary with id: {}", itineraryId);
        itineraryService.delete(itineraryId);
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                .message("Delete Itinerary successfully")
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/{itineraryId}")
    public ResponseEntity<ApiResponse<ItineraryResponse>> getItinerary(@PathVariable @Min(1) Integer itineraryId) {
        log.info("API get itinerary with id: {}", itineraryId);
        ApiResponse<ItineraryResponse> apiResponse = ApiResponse.<ItineraryResponse>builder()
                .result(itineraryService.getItineraryById(itineraryId))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<ApiResponse<List<ItineraryResponse>>> getItinerary(@PathVariable @Min(1) Long tourId) {
        log.info("API get all itinerary for Tour with tourId: {}", tourId);
        ApiResponse<List<ItineraryResponse>> apiResponse = ApiResponse.<List<ItineraryResponse>>builder()
                .result(itineraryService.getItineraryForTour(tourId))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }
}
