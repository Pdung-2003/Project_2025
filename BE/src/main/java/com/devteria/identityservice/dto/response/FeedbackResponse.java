package com.devteria.identityservice.dto.response;

import lombok.Data;

@Data
public class FeedbackResponse {
    private Integer feedbackId;
    private Long customerId;
    private Long tourId;
    private Integer bookingId;
    private Integer rating;
    private String comment;
    private String createdAt;
    private String updatedAt;
}
