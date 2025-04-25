package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    // Liên kết tới UserRolePermission để lấy tất cả người dùng và vai trò có quyền này
    @OneToMany(mappedBy = "permission", cascade = CascadeType.ALL)
    private Set<UserRolePermission> userRolePermissions;

}
