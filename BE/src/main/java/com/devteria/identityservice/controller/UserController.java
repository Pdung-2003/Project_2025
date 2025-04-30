package com.devteria.identityservice.controller;

import java.util.List;

import com.devteria.identityservice.dto.request.UserAdminUpdateRequest;
import com.devteria.identityservice.dto.response.UserAdminResponse;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
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

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))  // Giữ nguyên như cũ
                .build();
    }

    @GetMapping
    ApiResponse<List<UserAdminResponse>> getUsers() {
        return ApiResponse.<List<UserAdminResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{userId}")
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
}

