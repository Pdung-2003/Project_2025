package com.devteria.identityservice.entity;

import java.sql.Timestamp;
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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String passwordDigest;
    private String email;
    private String address;
    @Column  // chỉ có Customer và Admin mới có
    private String fullName;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserRolePermission> userRolePermissions;

    @Column  // chỉ có Customer và Admin mới có
    private LocalDate birthDate;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

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

