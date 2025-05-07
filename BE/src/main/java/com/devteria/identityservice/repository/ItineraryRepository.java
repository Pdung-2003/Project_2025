package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Itinerary;
import com.devteria.identityservice.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Integer> {

    @Query("""
            SELECT CASE WHEN COUNT(i) > 0 THEN TRUE ELSE FALSE END
            FROM Itinerary i
            WHERE i.tour.tourId = :tourId AND i.dayNumber = :dayNumber
            """)
    boolean existsByTourIdAndDayNumber(Long tourId, Integer dayNumber);

    @Query("""
            SELECT i FROM Itinerary i
            WHERE i.tour.tourId = :tourId AND i.dayNumber = :dayNumber
            """)
    Itinerary findByTourIdAndDayNumber(Long tourId, Integer dayNumber);

    @Query("""
            SELECT i FROM Itinerary i
            WHERE i.tour.tourId = :tourId
            ORDER BY i.dayNumber
            """)
    List<Itinerary> findAllByTour(Long tourId);
}
