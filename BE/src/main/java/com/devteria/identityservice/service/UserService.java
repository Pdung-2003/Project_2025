package com.devteria.identityservice.service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.devteria.identityservice.dto.request.UserAdminUpdateRequest;
import com.devteria.identityservice.dto.response.UserAdminResponse;
import com.devteria.identityservice.entity.Permission;
import com.devteria.identityservice.entity.UserRolePermission;
import com.devteria.identityservice.repository.PermissionRepository;
import com.devteria.identityservice.repository.UserRolePermissionRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
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
        user.setUserRolePermissions(new HashSet<>());
        return userRepository.save(user);
    }

    private void assignPermissionsToUser(User user, Set<Role> roles, List<Permission> permissions) {
        Map<String, String> rolePermissionMap = Map.of(
                "USER", "PERMISSION_USER",
                "ADMIN", "PERMISSION_ADMIN",
                "TOUR_MANAGER", "PERMISSION_TOUR_MANAGER"
        );

        Set<UserRolePermission> userRolePermissions = user.getUserRolePermissions() != null
                ? user.getUserRolePermissions()
                : new HashSet<>();

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
                        userRolePermissions.add(urp);
                        userRolePermissionRepository.save(urp);
                    });
        }
    }

    // Get current user information
    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = getUser(username);

        return userMapper.toUserResponse(user);
    }

    // Method to update user information
    @Transactional(rollbackFor = Exception.class)
    public UserResponse updateCurrentUser(UserUpdateRequest request, String username) {
        User user = getUser(username);
        user = userMapper.toUserByUpdateRequest(request, user);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional(rollbackFor = Exception.class)
    public UserAdminResponse updateUserByAdmin(Long userId, UserAdminUpdateRequest request) {
       User user = getUser(userId);
       user = userMapper.toUserByAdminUpdateRequest(request, user);

        HashSet<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
        userRolePermissionRepository.deleteByUserId(user.getId());

        for (Role role : roles) {
            UserRolePermission userRolePermission = new UserRolePermission();
            userRolePermission.setUser(user);
            userRolePermission.setRole(role);
            userRolePermission.setPermission(
                    permissionRepository.findByName("PERMISSION_" + role.getName()).orElseThrow()
            );
            userRolePermissionRepository.save(userRolePermission);
        }

        return userMapper.toUserAdminResponse(userRepository.save(user));
    }

    // Method to delete user
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    // Get list of all users
    public List<UserAdminResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserAdminResponse)
                .toList();
    }

    // Get a specific user by ID
    public UserResponse getUserResponseById(Long id) {
        return userMapper.toUserResponse(getUser(id));
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}


