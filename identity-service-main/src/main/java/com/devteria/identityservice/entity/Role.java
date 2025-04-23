package com.devteria.identityservice.entity;

import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<UserRolePermission> userRolePermissions;
    public Set<Permission> getPermissions() {
        return userRolePermissions.stream()
                .map(UserRolePermission::getPermission)
                .collect(Collectors.toSet());
    }
}
