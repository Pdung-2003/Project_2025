package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.request.FeedbackUpdateRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.dto.response.PaginationResponse;
import com.devteria.identityservice.dto.response.RatingResponse;
import com.devteria.identityservice.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@Slf4j(topic = "Feedback-Controller")
@RequiredArgsConstructor
@Validated
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<FeedbackResponse>> createFeedback (
            @RequestPart(name = "feedback") @Valid FeedbackRequest request,
            @RequestPart(name = "images") MultipartFile[] images
    ) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API user {} create feedback for booking {}", currentUsername, request.getBookingId());

        return ResponseEntity.ok().body(
                ApiResponse.<FeedbackResponse>builder()
                        .result(feedbackService.createFeedback(request, currentUsername, images))
                        .build()
        );
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<ApiResponse<FeedbackResponse>> getOne (@PathVariable Integer feedbackId) {
        log.info("API get feedback with id {}", feedbackId);

        return ResponseEntity.ok().body(
                ApiResponse.<FeedbackResponse>builder()
                        .result(feedbackService.getOne(feedbackId))
                        .build()
        );
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> getAllFeedbackForTour (
            @PathVariable Long tourId,
            @RequestParam(defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize
    ) {
        log.info("API get feedback for tour with id {}", tourId);

        Page<FeedbackResponse> responsePage = feedbackService.getAllForTour(tourId, pageNumber, pageSize);
        return ResponseEntity.ok().body(
                ApiResponse.<List<FeedbackResponse>>builder()
                        .result(responsePage.getContent())
                        .pagination(new PaginationResponse(responsePage))
                        .build()
        );
    }

    // lấy đánh giá trung bình của tour, và số lượng đánh giá của từng sao
    @GetMapping("/tour-avg-rating/{tourId}")
    public ResponseEntity<ApiResponse<RatingResponse>> getOverallForTour (@PathVariable Long tourId) {
        log.info("API get overall rating for tour with id {}", tourId);
        return ResponseEntity.ok().body(
                ApiResponse.<RatingResponse>builder()
                        .result(feedbackService.getRatingForTour(tourId))
                        .build()
        );
    }

    //chỉ admin và customer tạo ra feedback mới sửa
    //update rating và comment của feedback
    // thêm mới ảnh vào feedback nếu có
    @PutMapping("/{feedbackId}")
    public ResponseEntity<ApiResponse<FeedbackResponse>> updateDataFeedback(
            @PathVariable Integer feedbackId,
            @RequestPart(name = "feedback") FeedbackUpdateRequest request,
            @RequestPart(name = "images", required = false) MultipartFile[] images
    ){
        log.info("API change rating and comment of feedback with Id: {}", feedbackId);
        return ResponseEntity.ok().body(
                ApiResponse.<FeedbackResponse>builder()
                        .result(feedbackService.update(feedbackId, request, images))
                        .build()
        );
    }

    //chỉ admin và customer tạo ra feedback mới được xóa
    //chọn ảnh để xóa trong comment
    @DeleteMapping("/delete-image")
    public ResponseEntity<ApiResponse<Void>> deleteImageOfFeedback(@RequestParam("imagePathIds") List<Long> imagePathIds) {
        log.info("API delete feedback image with id {}", imagePathIds);
        feedbackService.deleteImagePathOfFeedback(imagePathIds);
        return ResponseEntity.noContent().build();
    }

    //chỉ admin và customer tạo ra feedback mới được xóa
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<ApiResponse<Void>> deleteFeedback(@PathVariable Integer feedbackId) {
        log.info("API delete feedback with id {}", feedbackId);
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }
}
