package com.devteria.identityservice.dto.response;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private Set<RoleResponse> roles; // Trả về danh sách các roles của người dùng
}
