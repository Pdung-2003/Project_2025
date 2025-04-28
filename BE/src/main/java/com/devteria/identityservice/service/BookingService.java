package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.BookingMapper;
import com.devteria.identityservice.repository.BookingRepository;
import com.devteria.identityservice.repository.TourRepository;
import com.devteria.identityservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

    public BookingResponse createBooking(BookingRequest request) {
        // Kiểm tra và lấy User và Tour từ database
        User user = userRepository.findById(request.getCustomerId())  // customerId là Long
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Tour tour = tourRepository.findById(request.getTourId())  // tourId là Long
                .orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXISTED));

        // Tạo đối tượng Booking
        Booking booking = bookingMapper.toEntity(request);
        booking.setCustomer(user);
        booking.setTour(tour);
        booking.setStatus(Booking.Status.valueOf(request.getStatus()));

        booking = bookingRepository.save(booking);
        return bookingMapper.toResponse(booking);
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingMapper::toResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_EXISTED));
        return bookingMapper.toResponse(booking);
    }

    public void deleteBooking(Integer bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new AppException(ErrorCode.BOOKING_NOT_EXISTED);
        }
        bookingRepository.deleteById(bookingId);
    }
}
