package com.devteria.identityservice.service;

import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.QnARequest;
import com.devteria.identityservice.dto.response.AnswerResponse;
import com.devteria.identityservice.dto.response.QAResponse;
import com.devteria.identityservice.entity.QuesAndAns;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.ForbiddenException;
import com.devteria.identityservice.exception.ResourceNotFoundException;
import com.devteria.identityservice.mapper.QuesAndAnsMapper;
import com.devteria.identityservice.repository.QuesAndAnsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuesAndAnsService {

    private final QuesAndAnsRepository quesAndAnsRepository;
    private final UserService userService;
    private final TourService tourService;
    private final QuesAndAnsMapper quesAndAnsMapper;

    public QAResponse createQuestion(QnARequest request, String username, Long tourId) {
        User user = userService.getUser(username);
        Tour tour = tourService.getTour(tourId);

        QuesAndAns question = QuesAndAns.builder()
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .tour(tour)
                .answers(List.of())
                .type(QuesAndAns.PostType.QUESTION)
                .build();

        question = quesAndAnsRepository.save(question);
        return quesAndAnsMapper.toQuestionResponse(question);
    }

    public QAResponse reply(Long qnaId, QnARequest request, String username) {
        User user = userService.getUser(username);
        QuesAndAns qa = getQuesAndAns(qnaId);
        List<QuesAndAns> listAns = qa.getAnswers();

        QuesAndAns rep = QuesAndAns.builder()
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .tour(qa.getTour())
                .createdBy(user)
                .parent(qa.getParent() != null ? qa.getParent() : qa)
                .answers(List.of())
                .type(QuesAndAns.PostType.ANSWER)
                .build();

        listAns.addLast(qa);
        qa.setAnswers(listAns);

        rep = quesAndAnsRepository.save(rep);
        return quesAndAnsMapper.toAnswerResponse(rep);
    }

    public void delete(Long qnaId) {
        QuesAndAns qa = getQuesAndAns(qnaId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Tour tour = qa.getTour();
        User managerTour = tour.getManager();
        assertCanModifyBooking(authentication, managerTour.getId());

        quesAndAnsRepository.delete(qa);
    }

    public List<QAResponse> getByTour (Long tourId) {
        Tour tour = tourService.getTour(tourId);
        List<QuesAndAns> quesAndAns = quesAndAnsRepository.findAllByTour(tour, QuesAndAns.PostType.QUESTION);
        return quesAndAns.stream()
                .map(quesAndAnsMapper::toQuestionResponse)
                .toList();
    }

    public QAResponse getQAById(Long id) {
        QuesAndAns quesAndAns = getQuesAndAns(id);

        if (quesAndAns.getType().equals(QuesAndAns.PostType.ANSWER)) {
            return quesAndAnsMapper.toAnswerResponse(quesAndAns);
        } else {
            return quesAndAnsMapper.toQuestionResponse(quesAndAns);
        }
    }

    public QuesAndAns getQuesAndAns(Long id) {
        return quesAndAnsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question or Answer not found"));
    }

    private boolean isRoleAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_" + PredefinedRole.ADMIN_ROLE));
    }

    private void assertCanModifyBooking(Authentication authentication, Long managerId) {
        if(!isRoleAdmin(authentication)) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User manager = userService.getUser(username);
            if (!manager.getId().equals(managerId)) {
                throw new ForbiddenException("You don't have permission");
            }
        }
    }
}
