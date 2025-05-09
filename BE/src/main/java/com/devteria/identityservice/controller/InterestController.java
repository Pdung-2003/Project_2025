package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.InterestRequest;
import com.devteria.identityservice.dto.response.InterestResponse;
import com.devteria.identityservice.service.InterestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interest")
@RequiredArgsConstructor
@Slf4j(topic = "Interest-Controller")
public class InterestController {

    private final InterestService interestService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<InterestResponse>> createInterest(@RequestBody InterestRequest request) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API user {} create interest", currentUsername);
        return ResponseEntity.ok().body(
               ApiResponse.<InterestResponse>builder()
                       .result(interestService.createInterest(request, currentUsername))
                       .build()
        );
    }

    @GetMapping("/my-interest")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<List<InterestResponse>>> getInterestForCurrentUser() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API get all interest for current user {}", currentUsername);
        return ResponseEntity.ok().body(
                ApiResponse.<List<InterestResponse>>builder()
                        .result(interestService.getAllInterestForUser(currentUsername))
                        .build()
        );
    }

    @PutMapping("/{interestId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<InterestResponse>> updateInterest(@PathVariable Long interestId, @RequestBody InterestRequest request) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API update interest with id {}", interestId);
        return ResponseEntity.ok().body(
                ApiResponse.<InterestResponse>builder()
                        .result(interestService.update(interestId, currentUsername, request))
                        .build()
        );
    }

    @DeleteMapping("/{interestId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<ApiResponse<InterestResponse>> deleteInterest(@PathVariable Long interestId) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("API delete interest with id {}", interestId);
        interestService.delete(interestId, currentUsername);
        return ResponseEntity.noContent().build();
    }
}
