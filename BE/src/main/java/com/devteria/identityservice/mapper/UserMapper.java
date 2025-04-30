package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.request.UserAdminUpdateRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
import com.devteria.identityservice.dto.response.UserAdminResponse;
import com.devteria.identityservice.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.UserRolePermission;
import org.mapstruct.MappingTarget;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "userRolePermissions", expression = "java(mapRoles(request.getRoles()))")  // ánh xạ Set<Long> sang Set<UserRolePermission>
    User toUser(UserCreationRequest request);

    @Mapping(target = "dateOfBirth", source = "birthDate")
    UserResponse toUserResponse(User user);

    @Mapping(target = "dateOfBirth", source = "birthDate")
    UserAdminResponse toUserAdminResponse(User user);

    // Phương thức ánh xạ từ Set<Long> sang Set<UserRolePermission>
    default Set<UserRolePermission> mapRoles(Set<Long> roleIds) {
        if (roleIds == null) {
            return null;
        }
        return roleIds.stream()
                .map(id -> {
                    UserRolePermission userRolePermission = new UserRolePermission();
                    Role role = new Role();
                    role.setId(id);
                    userRolePermission.setRole(role);
                    return userRolePermission;
                })
                .collect(Collectors.toSet());
    }

    default User toUserByAdminUpdateRequest(UserAdminUpdateRequest request, User user) {
        user.setFullName(request.getFullName());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthDate(request.getDob());
        return user;
    }

    default User toUserByUpdateRequest(UserUpdateRequest request, User user) {
        user.setFullName(request.getFullName());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthDate(request.getDob());
        return user;
    }

    // Phương thức ánh xạ từ Set<Long> sang Set<Role>
    default Set<Role> mapRoleIdsToRoles(Set<Long> roleIds) {
        if (roleIds == null) {
            return null;
        }
        return roleIds.stream()
                .map(id -> {
                    Role role = new Role();
                    role.setId(id);
                    return role;
                })
                .collect(Collectors.toSet());
    }
}
