package com.devteria.identityservice.dto.request;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.devteria.identityservice.validator.DobConstraint;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String password;
    String firstName;
    String lastName;
    String fullName;
    String phoneNumber;
    String address;
    Set<Long> roles;
}
