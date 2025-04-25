package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.Permission;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRolePermissionResponse {
    private User user;  // Thông tin người dùng
    private Role role;  // Thông tin vai trò
    private Permission permission;  // Thông tin quyền
}