package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.entity.Itinerary;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.ItineraryMapper;
import com.devteria.identityservice.repository.ItineraryRepository;
import com.devteria.identityservice.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private final ItineraryMapper itineraryMapper;
    private final TourRepository tourRepository;

    public ItineraryResponse createItinerary(ItineraryRequest itineraryRequest) {
        // Kiểm tra xem tour có tồn tại không
        Tour tour = tourRepository.findById(itineraryRequest.getTourId())
                .orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXISTED));

        // Tạo mới itinerary và lưu vào database
        Itinerary itinerary = itineraryMapper.toEntity(itineraryRequest);
        itinerary.setTour(tour);  // Gán tour cho itinerary
        itinerary = itineraryRepository.save(itinerary);

        return itineraryMapper.toResponse(itinerary);
    }

    public List<ItineraryResponse> getItinerariesByTourId(Long tourId) {
        // Tìm các itineraries theo tourId
        List<Itinerary> itineraries = itineraryRepository.findByTourId(tourId);
        return itineraries.stream()
                .map(itineraryMapper::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteItinerary(Integer itineraryId) {
        // Xóa itinerary
        if (!itineraryRepository.existsById(itineraryId)) {
            throw new AppException(ErrorCode.ITINERARY_NOT_EXISTED);
        }
        itineraryRepository.deleteById(itineraryId);
    }
}
