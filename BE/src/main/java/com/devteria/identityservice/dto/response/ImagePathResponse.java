package com.devteria.identityservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagePathResponse implements Serializable {
    private Long imagePathId;
    private String url;
    private LocalDateTime uploadedAt;
}
