package com.devteria.identityservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse implements Serializable {

    private Integer feedbackId;
    private Long tourId;
    private Integer bookingId;
    private String userId;
    private String userFullname;
    private Integer rating;
    private String comment;
    private List<ImagePathResponse> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
