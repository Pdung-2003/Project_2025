package com.devteria.identityservice.dto.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.Size;

import com.devteria.identityservice.validator.DobConstraint;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4, message = "USERNAME_INVALID")
    String username;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;

    String email;

    String fullName;
    String phoneNumber;
    String address;
    Boolean emailVerified; //chỉ có đối với user được ADMIN tạo

    @DobConstraint(min = 10, message = "INVALID_DOB")
    LocalDate dob;

    Set<Long> roles; //chỉ có đối với ADMIN
}
