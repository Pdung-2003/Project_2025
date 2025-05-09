package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    @Query("""
        SELECT t FROM Tour t
        WHERE (
            :searchKey IS NULL OR (
                t.tourName LIKE CONCAT('%', :searchKey, '%')
                OR t.location LIKE CONCAT('%', :searchKey, '%')
                OR t.destination LIKE CONCAT('%', :searchKey, '%')
                OR t.companyName LIKE CONCAT('%', :searchKey, '%')
            )
        )
        AND (:startDateFrom IS NULL OR t.startDate >= :startDateFrom)
        AND (:startDateTo IS NULL OR t.startDate <= :startDateTo)
        AND (:minPrice IS NULL OR t.price >= :minPrice)
        AND (:maxPrice IS NULL OR t.price <= :maxPrice)
        AND (:status IS NULL OR t.status = :status)
        AND (:managerId IS NULL OR t.manager.id = :managerId)
    """)
    Page<Tour> searchTour(@Param("searchKey") String searchKey,
                          @Param("startDateFrom") LocalDate startDateFrom,
                          @Param("startDateTo") LocalDate startDateTo,
                          @Param("minPrice") BigDecimal minPrice,
                          @Param("maxPrice") BigDecimal maxPrice,
                          @Param("status") Tour.Status status,
                          @Param("managerId") Long managerId,
                          Pageable pageable);


    // Tìm kiếm theo managerId
    List<Tour> findByManagerId(Long managerId);

    // Tìm kiếm theo companyName
    List<Tour> findByCompanyName(String companyName);

    // Tìm kiếm theo managerId và companyName
    List<Tour> findByManagerIdAndCompanyName(Long managerId, String companyName);
}
