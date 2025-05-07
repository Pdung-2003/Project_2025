package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.BookingFilterRequest;
import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.request.BookingUpdateRequest;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.dto.response.PaginationResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {

    private static final Logger log = LoggerFactory.getLogger(BookingController.class);
    private final BookingService bookingService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@RequestBody BookingRequest request) {
        log.info("API user book tour {}", request);
        return ResponseEntity.ok().body(
                ApiResponse.<BookingResponse>builder()
                        .result(bookingService.createBooking(request))
                        .build()
        );
    }

    @GetMapping("/my-booking")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookingForCurrentUser(
            @RequestParam(defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize
    ) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API get booking tour for user: {}", currentUsername);
        Page<BookingResponse> responsePage = bookingService.getBookingForCustomer(currentUsername, pageNumber, pageSize);

        return ResponseEntity.ok().body(
                ApiResponse.<List<BookingResponse>>builder()
                        .result(responsePage.getContent())
                        .pagination(new PaginationResponse(responsePage))
                        .build()
        );
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings(@RequestBody BookingFilterRequest request) {
        log.info("API get list booking for Admin or Tour Manager");
        Page<BookingResponse> responsePage = bookingService.getAllBookings(request);
        return ResponseEntity.ok().body(
                ApiResponse.<List<BookingResponse>>builder()
                        .result(responsePage.getContent())
                        .pagination(new PaginationResponse(responsePage))
                        .build()
        );
    }

    @PutMapping("/{bookingId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<ApiResponse<BookingResponse>> updateBooking(@PathVariable Integer bookingId,
                                                                      @RequestBody BookingUpdateRequest request,
                                                                      Authentication authentication
    ) {
        log.info("API update booking with id {} by Admin or Tour Manager", bookingId);
        return ResponseEntity.ok().body(
                ApiResponse.<BookingResponse>builder()
                        .result(bookingService.updateBooking(bookingId, request, authentication))
                        .build()
        );
    }

    @GetMapping("/{bookingId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable Integer bookingId) {
        log.info("API get booking with id {} by Admin or Tour Manager", bookingId);
        return ResponseEntity.ok().body(
                ApiResponse.<BookingResponse>builder()
                        .result(bookingService.getBookingById(bookingId))
                        .build()
        );
    }

    @PatchMapping("/change-status/{bookingId}")
    public ResponseEntity<ApiResponse<BookingResponse>> changeStatus(@PathVariable Integer bookingId,
                                                                     @RequestParam Booking.Status newStatus,
                                                                     Authentication authentication
    ) {
        log.info("API change status booking with id {} by Admin or Tour Manager", bookingId);
        return ResponseEntity.ok().body(
                ApiResponse.<BookingResponse>builder()
                        .result(bookingService.changeStatusBooking(bookingId, newStatus, authentication))
                        .build()
        );

    }
}
