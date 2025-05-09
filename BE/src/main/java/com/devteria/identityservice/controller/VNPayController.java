package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.response.VnPayResponse;
import com.devteria.identityservice.service.VNPayService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vn-pay")
@RequiredArgsConstructor
@Slf4j(topic = "VNPay-Controller")
public class VNPayController {

    private final VNPayService vnPayService;

    @GetMapping("/callback")
    public ResponseEntity<VnPayResponse> vnpayCallback(HttpServletRequest request) {
        VnPayResponse result = vnPayService.handleCallback(request);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/checksum-redirect")
    public ResponseEntity<ApiResponse<Boolean>> checksumRedirect(HttpServletRequest request) {
        boolean flag = vnPayService.checksum(request);
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();

        if (!flag) {
            apiResponse.setMessage("Checksum failed");
            apiResponse.setResult(false);
            return ResponseEntity.badRequest().body(apiResponse);
        } else {
            apiResponse.setMessage("Checksum success");
            apiResponse.setResult(true);
            return ResponseEntity.ok().body(apiResponse);
        }
    }
}
