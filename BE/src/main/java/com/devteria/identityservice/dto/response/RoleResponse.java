package com.devteria.identityservice.dto.response;

import java.util.Set;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
    Long id; // Đổi kiểu ID thành Long
    String name;
    String description;
    Set<PermissionResponse> permissions; // Các permission được liên kết với role
}
