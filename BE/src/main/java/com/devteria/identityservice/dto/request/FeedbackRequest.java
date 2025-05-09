package com.devteria.identityservice.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest implements Serializable {

    @NotNull
    private Integer bookingId;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;

    @NotNull
    @NotBlank
    private String comment;
}
