package com.devteria.identityservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.devteria.identityservice.dto.request.UserRolePermissionRequest;
import com.devteria.identityservice.dto.response.UserRolePermissionResponse;
import com.devteria.identityservice.entity.UserRolePermission;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.Permission;

@Mapper(componentModel = "spring")
public interface UserRolePermissionMapper {

    @Mapping(target = "user", ignore = true)  // Tùy thuộc vào cách bạn muốn xử lý User
    @Mapping(target = "role", ignore = true)  // Tùy thuộc vào cách bạn muốn xử lý Role
    @Mapping(target = "permission", ignore = true)  // Tùy thuộc vào cách bạn muốn xử lý Permission
    UserRolePermission toUserRolePermission(UserRolePermissionRequest request);

    UserRolePermissionResponse toUserRolePermissionResponse(UserRolePermission userRolePermission);
}
