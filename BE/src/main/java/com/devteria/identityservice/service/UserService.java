package com.devteria.identityservice.service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.UserAdminResponse;
import com.devteria.identityservice.entity.Permission;
import com.devteria.identityservice.entity.UserRolePermission;
import com.devteria.identityservice.exception.AuthenticationException;
import com.devteria.identityservice.exception.BadRequestException;
import com.devteria.identityservice.repository.PermissionRepository;
import com.devteria.identityservice.repository.UserRolePermissionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Value("${app.verificationCodeExpiry}")
    private Integer verificationCodeExpiry;

    @Value("${app.passwordResetCodeExpiry}")
    private Integer passwordResetExpiry;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRolePermissionRepository userRolePermissionRepository; // Add this
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Transactional(rollbackFor = Exception.class)
    public UserResponse registerForCustomer(UserCreationRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new BadRequestException("Email must not empty");
        }

        Role role = roleRepository.findByName(PredefinedRole.USER_ROLE).orElseThrow();
        request.setRoles(Set.of(role.getId()));

        User newUser = createUser(request);
        newUser.setEmailVerified(false);
        newUser.setVerificationCode(UUID.randomUUID().toString().split("-")[0].toUpperCase());
        newUser.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(verificationCodeExpiry));
        newUser = userRepository.save(newUser);
        return userMapper.toUserResponse(newUser);
    }

    @Transactional(rollbackFor = Exception.class)
    public UserAdminResponse createUserByAdmin(UserCreationRequest request) {
        return userMapper.toUserAdminResponse(createUser(request));
    }

    // Method to create a new user
    public User createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPasswordDigest(passwordEncoder.encode(request.getPassword()));
        user.setUserRolePermissions(new HashSet<>());
        user = userRepository.save(user);

        Set<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
        List<Permission> permissions = permissionRepository.findAll();
        assignPermissionsToUser(user, roles, permissions);

        return user;
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
    @Transactional(readOnly = true)
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

    @Transactional(rollbackFor = Exception.class)
    public void changePassword(String username, ChangePasswordRequest request) {
        User user = getUser(username);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPasswordDigest())) {
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        } else if (request.getNewPassword().equals(request.getOldPassword())) {
            throw new AppException(ErrorCode.DUPLICATE_PASSWORD);
        }
        user.setPasswordDigest(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    // Method to delete user
    @Transactional(rollbackFor = Exception.class)
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Get list of all users
    @Transactional(readOnly = true)
    public List<UserAdminResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserAdminResponse)
                .toList();
    }

    // Get a specific user by ID
    @Transactional(readOnly = true)
    public UserResponse getUserResponseById(Long id) {
        return userMapper.toUserResponse(getUser(id));
    }

    public void sendVerificationCode(String username) {
        User user = getUser(username);
        if(user.getEmailVerified().equals(true)) {
            throw new BadRequestException("Your account has been successfully verified");
        }

        user.setVerificationCode(UUID.randomUUID().toString().split("-")[0].toUpperCase());
        user.setVerificationCodeExpiry(LocalDateTime.now().plusMinutes(verificationCodeExpiry));
        userRepository.save(user);
        emailService.sendEmailVerify(user);
    }

    public void verifyEmail(VerifyEmailRequest request) {
        String username = request.getUsername();
        String code = request.getCode();
        User user = getUser(username);
        if(user.getEmailVerified().equals(true)) {
            throw new BadRequestException("Your account has been successfully verified");
        }

        if (!user.getVerificationCode().equalsIgnoreCase(code)
            || user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())
        ) {
            throw new BadRequestException("Verification code incorrect");
        }

        user.setEmailVerified(true);
        user.setVerificationCode(null);
        user.setVerificationCodeExpiry(null);
        userRepository.save(user);
    }

    public void sendResetPasswordCode(String username) {
        User user = getUser(username);
        if(user.getEmailVerified().equals(false)) {
            throw new BadRequestException("Email not verified");
        }

        user.setPasswordResetCode(UUID.randomUUID().toString().split("-")[0].toUpperCase());
        user.setPasswordResetExpiry(LocalDateTime.now().plusMinutes(passwordResetExpiry));
        userRepository.save(user);
        emailService.sendEmailResetPassword(user);
    }

    public void resetPassword(ResetPasswordRequest request) {
        String username = request.getUsername();
        String code = request.getCode();
        String newPw = request.getNewPassword();

        User user = getUser(username);

        if (!user.getPasswordResetCode().equalsIgnoreCase(code)
                || user.getPasswordResetExpiry().isBefore(LocalDateTime.now())
        ) {
            throw new BadRequestException("Reset password code incorrect");
        }

        user.setPasswordDigest(passwordEncoder.encode(newPw));
        user.setPasswordResetCode(null);
        user.setPasswordResetExpiry(null);
        userRepository.save(user);
    }

    public List<UserAdminResponse> getUserWithManagersRole() {
        Role role = roleRepository.findByName(PredefinedRole.TOUR_MANAGER_ROLE)
                .orElseThrow();

        List<User> managers = userRepository.findAllUserWithManagerRole(role.getName());
        return managers.stream().map(userMapper::toUserAdminResponse).toList();
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


