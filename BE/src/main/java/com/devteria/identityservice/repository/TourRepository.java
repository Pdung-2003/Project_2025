package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    // Tìm kiếm theo managerId
    List<Tour> findByManagerId(Long managerId);

    // Tìm kiếm theo companyName
    List<Tour> findByCompanyName(String companyName);

    // Tìm kiếm theo managerId và companyName
    List<Tour> findByManagerIdAndCompanyName(Long managerId, String companyName);
}
