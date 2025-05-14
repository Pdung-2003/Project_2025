package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.QuesAndAns;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AnswerResponse implements Serializable {

    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String createdBy;
    private QuesAndAns.PostType type;
}
