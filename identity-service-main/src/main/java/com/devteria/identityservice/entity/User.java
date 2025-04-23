package com.devteria.identityservice.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String passwordDigest;
    private String email;

    private String address;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Column(nullable = true)  // chỉ có Customer và Admin mới có
    private String fullName;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserRolePermission> userRolePermissions;

    public Set<Role> getRoles() {
        return userRolePermissions.stream()
                .map(UserRolePermission::getRole)
                .collect(Collectors.toSet());
    }

    public Set<Permission> getPermissions() {
        return userRolePermissions.stream()
                .map(UserRolePermission::getPermission)
                .collect(Collectors.toSet());
    }
    @Column(nullable = true)  // chỉ có Customer và Admin mới có
    private java.sql.Date birthDate;
}

