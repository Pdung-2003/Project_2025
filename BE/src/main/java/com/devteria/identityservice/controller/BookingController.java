package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {

    BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{bookingId}")
    public BookingResponse getBookingById(@PathVariable Integer bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    @DeleteMapping("/{bookingId}")
    public void deleteBooking(@PathVariable Integer bookingId) {
        bookingService.deleteBooking(bookingId);
    }
}
