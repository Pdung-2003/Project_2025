package com.devteria.identityservice.controller;

import java.util.List;

import com.devteria.identityservice.dto.request.*;
import com.devteria.identityservice.dto.response.UserAdminResponse;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
    UserService userService;

    @PostMapping("/register")
    ApiResponse<UserResponse> registerUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.registerForCustomer(request))
                .build();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ApiResponse<UserAdminResponse> createUserByAdmin(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserAdminResponse>builder()
                .result(userService.createUserByAdmin(request))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ApiResponse<List<UserAdminResponse>> getUsers() {
        return ApiResponse.<List<UserAdminResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long userId) {
        log.info("API request get data user with id: {}", userId);
        ApiResponse<UserResponse> apiResponse = ApiResponse.<UserResponse>builder()
                .result(userService.getUserResponseById(userId))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo() {
        log.info("API request get data current user");
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ApiResponse<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    /**
     * API người dùng chỉnh sửa thông tin cá nhân của mình
     */
    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    ApiResponse<UserResponse> updateUser(@RequestBody UserUpdateRequest request, @AuthenticationPrincipal Jwt jwt) {
        String username = jwt.getSubject();
        log.info("API update user with id: {}", username);
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateCurrentUser(request, username))
                .build();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{userId}")
    ApiResponse<UserAdminResponse> updateUserByAdmin(@PathVariable Long userId,
                                                     @RequestBody UserAdminUpdateRequest request) {
        log.info("API admin update user with id: {}", userId);
        return ApiResponse.<UserAdminResponse>builder()
                .result(userService.updateUserByAdmin(userId, request))
                .build();
    }

    @PatchMapping("/change-password")
    ApiResponse<Void> changePassword(@RequestBody ChangePasswordRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API change password for user with id: {}", username);
        userService.changePassword(username, request);
        return ApiResponse.<Void>builder()
                .message("Change password successfully")
                .build();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/managers")
    ApiResponse<List<UserAdminResponse>> getManagers() {
        log.info("API admin get list manager");
        return ApiResponse.<List<UserAdminResponse>>builder()
                .result(userService.getUserWithManagersRole())
                .build();
    }

    // yêu cầu gửi mã xác minh đến email
    @GetMapping("/send-verification-code")
    public ResponseEntity<Void> sendVerificationCode(@RequestParam String username) {
        log.info("API request verification code for user: {}", username);
        userService.sendVerificationCode(username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@RequestBody VerifyEmailRequest request) {
        log.info("API verify email for user: {}", request.getUsername());
        userService.verifyEmail(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/send-reset-password-code")
    public ResponseEntity<Void> sendPasswordResetCode(@RequestParam String username) {
        log.info("API request reset password for user: {}", username);
        userService.sendResetPasswordCode(username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        log.info("API request change new password for user: {}", request.getUsername());
        userService.resetPassword(request);
        return ResponseEntity.ok().build();
    }
}

