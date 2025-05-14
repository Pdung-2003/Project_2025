package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.QuesAndAns;
import com.devteria.identityservice.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuesAndAnsRepository extends JpaRepository<QuesAndAns, Long> {

    @Query("""
            SELECT qa FROM QuesAndAns qa
            WHERE qa.tour = :tour
            AND qa.type = :type
            ORDER BY qa.createdAt DESC
            """)
    List<QuesAndAns> findAllByTour(Tour tour, QuesAndAns.PostType type);
}
