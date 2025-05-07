package com.devteria.identityservice.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest implements Serializable {

    @Size(min = 6, message = "INVALID_PASSWORD")
    private String oldPassword;

    @Size(min = 6, message = "INVALID_PASSWORD")
    private String newPassword;
}
