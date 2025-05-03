package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class FeedbackRequest {
    private Long customerId;
    private Long tourId;
    private Integer bookingId; // Có thể null nếu không ràng buộc bắt buộc
    private Integer rating;
    private String comment;
}
