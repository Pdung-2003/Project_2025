package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.UserRolePermission;

@Repository
public interface UserRolePermissionRepository extends JpaRepository<UserRolePermission, Long> {
    void deleteByUser(User user);
}
