package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByTourTourId(Long tourId);
    List<Feedback> findByCustomerId(Long customerId);
}
