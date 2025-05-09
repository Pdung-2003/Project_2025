package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("""
            SELECT p FROM Payment p
            WHERE p.booking.bookingCode = :bookingCode
            AND p.transactionRef = :transactionRef
            """)
    Payment findByBookingCodeAndTransRef(String bookingCode, String transactionRef);

    List<Payment> findAllByBooking(Booking booking);
}
