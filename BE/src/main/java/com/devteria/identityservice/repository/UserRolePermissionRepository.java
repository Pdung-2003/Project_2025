package com.devteria.identityservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.UserRolePermission;

@Repository
public interface UserRolePermissionRepository extends JpaRepository<UserRolePermission, Long> {

    @Modifying
    @Query("DELETE FROM UserRolePermission urp WHERE urp.user.id = :userId")
    void deleteByUserId(Long userId);
}
