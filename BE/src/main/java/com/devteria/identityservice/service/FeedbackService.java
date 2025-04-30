package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.entity.*;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.FeedbackMapper;
import com.devteria.identityservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final BookingRepository bookingRepository;

    public FeedbackResponse createFeedback(FeedbackRequest request) {
        User user = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Tour tour = tourRepository.findById(request.getTourId())
                .orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXISTED));

        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId())
                    .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        }

        Feedback feedback = feedbackMapper.toEntity(request);
        feedback.setCustomer(user);
        feedback.setTour(tour);
        feedback.setBooking(booking);

        return feedbackMapper.toResponse(feedbackRepository.save(feedback));
    }

    public List<FeedbackResponse> getFeedbacksByTourId(Long tourId) {
        return feedbackRepository.findByTourTourId(tourId).stream()
                .map(feedbackMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbacksByCustomerId(Long customerId) {
        return feedbackRepository.findByCustomerId(customerId).stream()
                .map(feedbackMapper::toResponse)
                .collect(Collectors.toList());
    }
}
