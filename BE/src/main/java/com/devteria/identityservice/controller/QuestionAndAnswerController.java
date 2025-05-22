package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.QnARequest;
import com.devteria.identityservice.dto.response.QAResponse;
import com.devteria.identityservice.service.QuesAndAnsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/qna")
public class QuestionAndAnswerController {

    private final QuesAndAnsService quesAndAnsService;

    //Api người dùng đặt câu hỏi
    @PostMapping("/create-question/{tourId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> createQuestion(@PathVariable Long tourId, @RequestBody QnARequest request) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok().body(
                ApiResponse.builder()
                        .result(quesAndAnsService.createQuestion(request, currentUsername, tourId))
                        .build()
        );
    }

    //Api phản hồi lại (có thể phản hồi lại câu hỏi hoặc câu trả lời nào đó)
    @PostMapping("/reply/{qnaId}")
    public ResponseEntity<?> reply(@PathVariable Long qnaId, @RequestBody QnARequest request) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok().body(
                ApiResponse.builder()
                        .result(quesAndAnsService.reply(qnaId, request, currentUsername))
                        .build()
        );
    }

    @GetMapping("/{qnaId}")
    public ResponseEntity<ApiResponse<QAResponse>> getById(@PathVariable Long qnaId) {
        return ResponseEntity.ok().body(
                ApiResponse.<QAResponse>builder()
                        .result(quesAndAnsService.getQAById(qnaId))
                        .build()
        );
    }

    //Lấy danh sách hỏi đáp theo tour id
    @GetMapping
    public ResponseEntity<?> getByTour(@RequestParam Long tourId) {
        return ResponseEntity.ok().body(
            ApiResponse.builder()
                    .result(quesAndAnsService.getByTour(tourId))
                    .build()
        );
    }

    @DeleteMapping("/{qnaId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable Long qnaId) {
        quesAndAnsService.delete(qnaId);
        return ResponseEntity.noContent().build();
    }
}
