package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.response.QAResponse;
import com.devteria.identityservice.entity.QuesAndAns;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuesAndAnsMapper {

    default QAResponse toQuestionResponse(QuesAndAns quesAndAns) {
        List<QAResponse> answerResponseList = quesAndAns.getAnswers().stream()
                .map(this::toAnswerResponse).toList();
        
        return QAResponse.builder()
                .id(quesAndAns.getId())
                .content(quesAndAns.getContent())
                .createdAt(quesAndAns.getCreatedAt())
                .createdBy(quesAndAns.getCreatedBy().getFullName())
                .type(QuesAndAns.PostType.QUESTION)
                .answers(answerResponseList)
                .build();
    }

    default QAResponse toAnswerResponse(QuesAndAns quesAndAns) {
        return QAResponse.builder()
                .id(quesAndAns.getId())
                .content(quesAndAns.getContent())
                .createdAt(quesAndAns.getCreatedAt())
                .createdBy(quesAndAns.getCreatedBy().getFullName())
                .type(QuesAndAns.PostType.ANSWER)
                .build();
    }
}
