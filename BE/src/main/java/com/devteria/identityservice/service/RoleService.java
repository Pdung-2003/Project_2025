package com.devteria.identityservice.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.devteria.identityservice.entity.UserRolePermission;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.repository.UserRolePermissionRepository;
import org.springframework.stereotype.Service;

import com.devteria.identityservice.dto.request.RoleRequest;
import com.devteria.identityservice.dto.response.RoleResponse;
import com.devteria.identityservice.mapper.RoleMapper;
import com.devteria.identityservice.repository.PermissionRepository;
import com.devteria.identityservice.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;
    UserRolePermissionRepository userRolePermissionRepository;

    public RoleResponse create(RoleRequest request) {
        // Tạo đối tượng Role từ request
        var role = roleMapper.toRole(request);

        // Lưu role vào database
        role = roleRepository.save(role);

        // Tạo các bản ghi UserRolePermission cho role mới
        HashSet<UserRolePermission> userRolePermissions = new HashSet<>();
        for (Long permissionId : request.getPermissions()) {
            var permission = permissionRepository.findById(permissionId)
                    .orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));

            UserRolePermission userRolePermission = new UserRolePermission();
            userRolePermission.setRole(role);
            userRolePermission.setPermission(permission);

            userRolePermissions.add(userRolePermission);
        }

        // Lưu các bản ghi UserRolePermission
        userRolePermissionRepository.saveAll(userRolePermissions);

        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(Long roleId) {
        roleRepository.deleteById(roleId);
    }
}
