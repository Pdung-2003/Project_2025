package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.entity.Itinerary;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.BadRequestException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.exception.ResourceNotFoundException;
import com.devteria.identityservice.mapper.ItineraryMapper;
import com.devteria.identityservice.repository.ItineraryRepository;
import com.devteria.identityservice.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "Itinerary-Service")
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;
    private final TourRepository tourRepository;
    private final ItineraryMapper itineraryMapper;

    @Transactional(rollbackFor = Exception.class)
    public ItineraryResponse create(ItineraryRequest request) {
        existsItineraryWithTourIdAndDayNumber(request.getTourId(), request.getDayNumberOfTour());

        Tour tour = getTourById(request.getTourId());
        validateDayNumber(tour, request.getDayNumberOfTour());

        Itinerary newItinerary = itineraryMapper.toItinerary(request);
        newItinerary.setTour(tour);

        return itineraryMapper.toItineraryResponse(itineraryRepository.save(newItinerary));
    }

    @Transactional(rollbackFor = Exception.class)
    public ItineraryResponse update(Integer itineraryId, ItineraryRequest request) {
        Itinerary existingItinerary = getItinerary(itineraryId);

        // nếu tour id hoặc ngày trong tour bị thay đổi thì kiểm tra xem nó đã tồn tại hay chưa
        if (!request.getTourId().equals(existingItinerary.getTour().getTourId())
            || !request.getDayNumberOfTour().equals(existingItinerary.getDayNumber())
        ) {
            existsItineraryWithTourIdAndDayNumber(request.getTourId(), request.getDayNumberOfTour());
            Tour tour = getTourById(request.getTourId());
            validateDayNumber(tour, request.getDayNumberOfTour());

            existingItinerary.setTour(tour);
            existingItinerary.setDayNumber(request.getDayNumberOfTour());
        }

        existingItinerary.setLocation(request.getLocation());
        existingItinerary.setTitle(request.getTitle());
        existingItinerary.setActivityDescription(request.getActivityDescription());

        return itineraryMapper.toItineraryResponse(itineraryRepository.save(existingItinerary));
    }

    public ItineraryResponse getItineraryById(Integer itineraryId) {
        return itineraryMapper.toItineraryResponse(getItinerary(itineraryId));
    }

    public List<ItineraryResponse> getItineraryForTour(Long tourId) {
        List<Itinerary> itineraries = itineraryRepository.findAllByTour(tourId);
        return itineraries.stream().map(itineraryMapper::toItineraryResponse).toList();
    }

    public void delete(Integer itineraryId) {
        Itinerary itinerary = getItinerary(itineraryId);
        itineraryRepository.delete(itinerary);
    }

    public Itinerary getItinerary(Integer itineraryId) {
        return itineraryRepository.findById(itineraryId)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary Not found"));
    }

    private Tour getTourById(Long tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Not Found"));
    }

    private void existsItineraryWithTourIdAndDayNumber(Long tourId, Integer dayNumber) {
        if(itineraryRepository.existsByTourIdAndDayNumber(tourId, dayNumber)) {
            throw new BadRequestException("Day number of Tour existed");
        }
    }

    private void validateDayNumber(Tour tour, Integer dayNumber) {
        long days = ChronoUnit.DAYS.between(tour.getStartDate(), tour.getEndDate()) + 1;
        if(days < dayNumber) {
            throw new BadRequestException("Day number of Tour invalid");
        }
    }
}
