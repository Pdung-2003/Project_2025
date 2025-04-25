package com.devteria.identityservice.dto.response;

import lombok.Data;

@Data
public class CustomerResponse {
    private Integer customerId;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String createdAt;
    private String updatedAt;
}