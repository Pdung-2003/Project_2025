package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class CustomerRequest {
    private Integer userId;
    private String fullName;
    private String phoneNumber;
    private String address;
}