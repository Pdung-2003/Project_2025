package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {

    FeedbackService feedbackService;

    @PostMapping
    public FeedbackResponse createFeedback(@RequestBody FeedbackRequest request) {
        return feedbackService.createFeedback(request);
    }

    @GetMapping("/tour/{tourId}")
    public List<FeedbackResponse> getFeedbacksByTourId(@PathVariable Long tourId) {
        return feedbackService.getFeedbacksByTourId(tourId);
    }

    @GetMapping("/customer/{customerId}")
    public List<FeedbackResponse> getFeedbacksByCustomerId(@PathVariable Long customerId) {
        return feedbackService.getFeedbacksByCustomerId(customerId);
    }
}
