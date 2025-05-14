package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.QuesAndAns;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QAResponse implements Serializable {

    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String createdBy;
    private QuesAndAns.PostType type;
    private List<QAResponse> answers;
}
