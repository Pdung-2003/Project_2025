package com.devteria.identityservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {  // Sửa kiểu ID thành Long
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);  // Cập nhật kiểu ID
}


