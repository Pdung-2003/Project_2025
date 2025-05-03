package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Integer> {
    List<Itinerary> findByTourId(Long tourId);  // Tìm lịch trình theo tourId
}
