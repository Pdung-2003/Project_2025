package com.devteria.identityservice.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users",
        indexes = {
                @Index(name = "idx_user_username", columnList = "username")
        }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    private String passwordDigest;

    @Column(unique = true)
    private String email;

    private String address;
    private String phoneNumber;

    @Column  // chỉ có Customer và Admin mới có
    private String fullName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserRolePermission> userRolePermissions;

    @Column  // chỉ có Customer và Admin mới có
    private LocalDate birthDate;

    //@Column(nullable = false)
    private Boolean emailVerified = false;

    private String verificationCode;

    private LocalDateTime verificationCodeExpiry;

    private String passwordResetCode;

    private LocalDateTime passwordResetExpiry;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

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
}

