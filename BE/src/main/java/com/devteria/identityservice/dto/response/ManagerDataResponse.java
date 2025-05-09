package com.devteria.identityservice.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@ToString
public class ManagerDataResponse {
    private Long managerId;
    private String fullName;
    private LocalDate dob;
}
