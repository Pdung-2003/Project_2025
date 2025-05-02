package com.devteria.identityservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devteria.identityservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {  // Sửa kiểu ID thành Long
    boolean existsByUsername(String username);

    boolean existsByEmail(String Email);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);  // Cập nhật kiểu ID

    @Query("""
            SELECT u FROM User u
            JOIN u.userRolePermissions urp
            JOIN urp.role r
            WHERE r.name = :roleName
            """)
    List<User> findAllUserWithManagerRole(String roleName);
}


