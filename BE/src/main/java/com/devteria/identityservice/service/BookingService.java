package com.devteria.identityservice.service;

import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.BookingFilterRequest;
import com.devteria.identityservice.dto.request.BookingRequest;
import com.devteria.identityservice.dto.request.BookingUpdateRequest;
import com.devteria.identityservice.dto.request.SortField;
import com.devteria.identityservice.dto.response.BookingResponse;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.*;
import com.devteria.identityservice.mapper.BookingMapper;
import com.devteria.identityservice.repository.BookingRepository;
import com.devteria.identityservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final UserRepository userRepository;
    private final TourService tourService;
    private final EmailService emailService;

    @Transactional(rollbackFor = Exception.class)
    public BookingResponse createBooking(BookingRequest request) {
        // Kiểm tra và lấy User và Tour từ database
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User customer = getUser(username);

        Tour tour = tourService.getTour(request.getTourId());
        if(LocalDate.now().isAfter(tour.getStartDate())) {
            throw new BadRequestException("The selected tour date is invalid.");
        }
        tourService.holdTicketForTour(tour, request.getNumberOfPeople());
        String bookingCode = generateBookingCode();
        while (bookingRepository.existsByBookingCode(bookingCode)) {
            bookingCode = generateBookingCode();
        }

        // Tạo đối tượng Booking
        Booking booking = bookingMapper.toEntity(request);
        booking.setCustomer(customer);
        booking.setTour(tour);
        booking.setBookingCode(bookingCode);
        booking.setStatus(Booking.Status.PENDING);
        booking.setTourDate(tour.getStartDate());
        booking.setPriceBooking(tour.getPrice().multiply(BigDecimal.valueOf(request.getNumberOfPeople())));
        booking = bookingRepository.save(booking);
        emailService.sendEmailConfirmHoldTicket(customer, tour, booking);
        return bookingMapper.toResponse(booking);
    }

    @Transactional(readOnly = true)
    public Page<BookingResponse> getBookingForCustomer(String username, Integer pageNumber, Integer pageSize) {
        User user = getUser(username);
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Booking> bookings = bookingRepository.findByCustomerId(user.getId(), pageable);

        return bookings.map(bookingMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<BookingResponse> getAllBookings(BookingFilterRequest request) {
        Sort sort = Sort.unsorted();
        if (!request.getSort().isEmpty()) {
            for (SortField s : request.getSort()) {
                sort.and(Sort.by(s.getDirection(), s.getProperty()));
            }
        }

        Pageable pageable = PageRequest.of(request.getPageNumber(), request.getPageSize(), sort);
        Page<Booking> bookings = bookingRepository.findAllByFilter(
                request.getUserId(), request.getTourId(),
                request.getBookingCode(),
                request.getStatus(),
                request.getFromDate(), request.getToDate(),
                request.getIsTicketSent(),
                request.getMinPrice(), request.getMaxPrice(),
                pageable);

        return bookings.map(bookingMapper::toResponse);
    }

    @Transactional(rollbackFor = Exception.class)
    public BookingResponse updateBooking(Integer bookingId, BookingUpdateRequest request, Authentication authentication) {
        Booking booking = getBooking(bookingId);

        //kiểm tra chỉ có admin hoặc tour manager quản lý tour đó mới được chỉnh sửa
        Long managerId = booking.getTour().getManager().getId();
        assertCanModifyBooking(authentication, managerId);

        booking = bookingMapper.toEntityByUpdateRequest(request, booking);
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    @Transactional(rollbackFor = Exception.class)
    public BookingResponse changeStatusBooking(Integer bookingId, Booking.Status newStatus, Authentication authentication) {
        Booking booking = getBooking(bookingId);

        //kiểm tra chỉ có admin hoặc tour manager quản lý tour đó mới được chỉnh sửa
        Long managerId = booking.getTour().getManager().getId();
        assertCanModifyBooking(authentication, managerId);

        booking.setStatus(newStatus);
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    public BookingResponse getBookingById(Integer bookingId) {
        return bookingMapper.toResponse(getBooking(bookingId));
    }

    public Booking getBooking(Integer bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    /*
    public void deleteBooking(Integer bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new AppException(ErrorCode.BOOKING_NOT_EXISTED);
        }
        bookingRepository.deleteById(bookingId);
    }*/

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private String generateBookingCode() {
        String uuid = UUID.randomUUID().toString().replace("-", "");
        BigInteger number = new BigInteger(uuid, 16);
        return number.toString(36).toUpperCase().substring(0, 10);
    }

    private boolean isRoleAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_" + PredefinedRole.ADMIN_ROLE));
    }

    private void assertCanModifyBooking(Authentication authentication, Long managerId) {
        if(!isRoleAdmin(authentication)) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User manager = getUser(username);
            if (!manager.getId().equals(managerId)) {
                throw new ForbiddenException("You don't have permission");
            }
        }
    }
}
