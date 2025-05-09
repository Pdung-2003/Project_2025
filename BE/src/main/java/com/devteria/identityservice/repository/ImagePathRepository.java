package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.ImagePath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagePathRepository extends JpaRepository<ImagePath, Long> {

    @Query("""
            SELECT i FROM ImagePath i
            WHERE i.referenceId = :refId AND i.referenceType = :referenceType
            """)
    List<ImagePath> findAllForReferenceEntity(ImagePath.ReferenceEntity referenceType, Long refId);
}
