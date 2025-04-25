package com.devteria.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRolePermissionRequest {
    private Long userId;  // ID của người dùng
    private Long roleId;  // ID của vai trò
    private Long permissionId;  // ID của quyền
}
