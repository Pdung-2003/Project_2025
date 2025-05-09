package com.devteria.identityservice.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackUpdateRequest implements Serializable {

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;

    @NotNull
    @NotBlank
    private String comment;
}
