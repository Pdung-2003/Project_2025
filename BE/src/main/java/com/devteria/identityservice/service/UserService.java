package com.devteria.identityservice.service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;

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

        // Create user entity
        User user = userMapper.toUser(request);
        user.setPasswordDigest(passwordEncoder.encode(request.getPassword()));

        // Save the user first
        user = userRepository.save(user);

        HashSet<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));

        // Create user-role-permission records
        for (Role role : roles) {
            for(Permission permission : permissionRepository.findAll()) {
                UserRolePermission userRolePermission = new UserRolePermission();
                userRolePermission.setUser(user);
                userRolePermission.setRole(role);
                userRolePermission.setPermission(permission);
                userRolePermissionRepository.save(userRolePermission);
            }
        }

        return userMapper.toUserResponse(user);
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


