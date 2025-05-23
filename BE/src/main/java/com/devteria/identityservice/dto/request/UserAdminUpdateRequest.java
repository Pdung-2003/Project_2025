package com.devteria.identityservice.dto.request;

import java.time.LocalDate;
import java.util.Set;

import com.devteria.identityservice.validator.DobConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserAdminUpdateRequest {

    @DobConstraint(min = 10, message = "INVALID_DOB")
    LocalDate dob;

    @NotBlank
    String fullName;
    String phoneNumber;
    Set<Long> roles;

    String address;
}