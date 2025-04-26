package com.devteria.identityservice.service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.devteria.identityservice.entity.Permission;
import com.devteria.identityservice.entity.UserRolePermission;
import com.devteria.identityservice.repository.PermissionRepository;
import com.devteria.identityservice.repository.UserRolePermissionRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.UserMapper;
import com.devteria.identityservice.repository.RoleRepository;
import com.devteria.identityservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRolePermissionRepository userRolePermissionRepository; // Add this
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // Method to create a new user
    @Transactional
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = createAndSaveUser(request);
        Set<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
        List<Permission> permissions = permissionRepository.findAll();

        assignPermissionsToUser(user, roles, permissions);

        return userMapper.toUserResponse(user);
    }

    private User createAndSaveUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);
        user.setPasswordDigest(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    private void assignPermissionsToUser(User user, Set<Role> roles, List<Permission> permissions) {
        Map<String, String> rolePermissionMap = Map.of(
                "USER", "User Permission",
                "ADMIN", "Admin Permission",
                "TOUR_MANAGER", "Tour Manager Permission"
        );

        for (Role role : roles) {
            String requiredPermission = rolePermissionMap.get(role.getName());
            if (requiredPermission == null) continue;

            permissions.stream()
                    .filter(permission -> permission.getName().equals(requiredPermission))
                    .findFirst()
                    .ifPresent(permission -> {
                        UserRolePermission urp = new UserRolePermission();
                        urp.setUser(user);
                        urp.setRole(role);
                        urp.setPermission(permission);
                        userRolePermissionRepository.save(urp);
                    });
        }
    }

    // Get current user information
    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    // Method to update user information
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        user.setPasswordDigest(passwordEncoder.encode(request.getPassword()));

        // Update roles using UserRolePermission
        HashSet<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
        // You can clear existing roles and add new ones
        userRolePermissionRepository.deleteByUser(user);

        for (Role role : roles) {
            UserRolePermission userRolePermission = new UserRolePermission();
            userRolePermission.setUser(user);
            userRolePermission.setRole(role);
            userRolePermissionRepository.save(userRolePermission);
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    // Method to delete user
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    // Get list of all users
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    // Get a specific user by ID
    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
}


