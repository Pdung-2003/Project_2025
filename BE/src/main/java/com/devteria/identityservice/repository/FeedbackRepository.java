package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Feedback;
import com.devteria.identityservice.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("""
            SELECT COUNT(f) > 0
            FROM Feedback f
            WHERE f.customer.id = :userId
              AND f.booking.id = :bookingId
            """)
    boolean existsByCustomerIdAndBookingId(Long userId, Integer bookingId);

    Page<Feedback> findAllByTour (Tour tour, Pageable pageable);

    // Tính trung bình rating cho một tour cụ thể
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.tour.tourId = :tourId")
    Double findAverageRatingByTourId(Long tourId);

    // Đếm số lượng feedback theo từng mức rating cho một tour
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.tour.tourId = :tourId AND f.rating = :rating")
    Integer countByTourIdAndRating(Long tourId, Integer rating);

    @Query("SELECT " +
            "AVG(f.rating), " +
            "SUM(CASE WHEN f.rating = 1 THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN f.rating = 2 THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN f.rating = 3 THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN f.rating = 4 THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN f.rating = 5 THEN 1 ELSE 0 END) " +
            "FROM Feedback f WHERE f.tour.tourId = :tourId")
    Object[] getRatingSummaryByTourId(Long tourId);
}
