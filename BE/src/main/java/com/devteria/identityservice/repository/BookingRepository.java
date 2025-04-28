package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {  // bookingId là Integer

    // Tìm kiếm tất cả các booking của một user
    List<Booking> findByCustomerId(Long customerId);

    // Tìm kiếm tất cả các booking của một tour
    List<Booking> findByTourId(Long tourId);

    // Tìm kiếm theo bookingId
    Booking findByBookingId(Integer bookingId);
}
