package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.response.ImagePathResponse;
import com.devteria.identityservice.mapper.ImagePathMapper;
import com.devteria.identityservice.service.ImagePathService;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/image-path")
@RequiredArgsConstructor
@Slf4j
public class ImagePathController {

    private final ImagePathService imagePathService;
    private final ImagePathMapper imagePathMapper;

    @DeleteMapping("/{imagePathId}")
    public ResponseEntity<Void> deleteImage(@PathVariable @Min(1) Long imagePathId) {
        imagePathService.deleteAllByIds(List.of(imagePathId));
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{imagePathId}")
    public ResponseEntity<ApiResponse<ImagePathResponse>> updateTitleImage(@PathVariable @Min(1) Long imagePathId,
                                                                           @RequestParam String title
    ) {

        return ResponseEntity.ok().body(
                ApiResponse.<ImagePathResponse>builder()
                        .result(imagePathMapper.toImagePathResponse(
                                    imagePathService.updateTitle(title, imagePathId)
                                )
                        )
                        .build()
        );
    }
}
