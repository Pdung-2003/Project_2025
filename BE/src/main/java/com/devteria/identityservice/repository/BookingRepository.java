package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {  // bookingId là Integer

    // Tìm kiếm tất cả các booking của một user
//    List<Booking> findByCustomerId(Long customerId);

    Page<Booking> findByCustomerId(Long customerId, Pageable pageable);

    // Tìm kiếm tất cả các booking của một tour
    @Query("""
            SELECT b FROM Booking b WHERE b.tour.tourId = :tourId
            """)
    List<Booking> findByTourId(Long tourId);

    // Tìm kiếm theo bookingId
    Booking findByBookingId(Integer bookingId);

    boolean existsByBookingCode(String bookingCode);

    @Query("""
    SELECT b
    FROM Booking b
    WHERE (:userId IS NULL OR b.customer.id = :userId)
      AND (:tourId IS NULL OR b.tour.tourId = :tourId)
      AND (:bookingCode IS NULL OR LOWER(b.bookingCode) LIKE LOWER(CONCAT('%', :bookingCode, '%')))
      AND (:status IS NULL OR b.status = :status)
      AND (:fromDate IS NULL OR b.tourDate >= :fromDate)
      AND (:toDate IS NULL OR b.tourDate <= :toDate)
      AND (:isTicketSent IS NULL OR b.isTicketSent = :isTicketSent)
      AND (:minPrice IS NULL OR b.priceBooking >= :minPrice)
      AND (:maxPrice IS NULL OR b.priceBooking <= :maxPrice)
""")
    Page<Booking> findAllByFilter(
            @Param("userId") Integer userId,
            @Param("tourId") Integer tourId,
            @Param("bookingCode") String bookingCode,
            @Param("status") Booking.Status status,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("isTicketSent") Boolean isTicketSent,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );

    Optional<Booking> findByBookingCode(String bookingCode);
}
