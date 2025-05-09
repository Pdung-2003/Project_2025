package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.InterestRequest;
import com.devteria.identityservice.dto.response.InterestResponse;
import com.devteria.identityservice.entity.Interest;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.ForbiddenException;
import com.devteria.identityservice.exception.ResourceNotFoundException;
import com.devteria.identityservice.mapper.InterestMapper;
import com.devteria.identityservice.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "Interest-Service")
public class InterestService {

    private final InterestRepository interestRepository;
    private final UserService userService;
    private final InterestMapper interestMapper;

    public InterestResponse createInterest(InterestRequest request, String username) {
        User user = userService.getUser(username);
        Interest interest = Interest.builder()
                .interestName(request.getInterestName())
                .user(user)
                .build();
        return interestMapper.toResponse(interestRepository.save(interest));
    }

    public InterestResponse update(Long interestId, String currentUsername, InterestRequest request) {
        Interest interest = getInterest(interestId);
        User user = interest.getUser();

        if(!user.getUsername().equals(currentUsername)) {
            throw new ForbiddenException("You don't have permission");
        }

        interest.setInterestName(request.getInterestName());
        return interestMapper.toResponse(interestRepository.save(interest));
    }

    public List<InterestResponse> getAllInterestForUser(String username) {
        User user = userService.getUser(username);
        List<Interest> interests = interestRepository.findAllByUser(user);
        return interests.stream().map(interestMapper::toResponse).toList();
    }

    public void delete(Long id, String currentUsername) {
        Interest interest = getInterest(id);
        User user = interest.getUser();

        if(!user.getUsername().equals(currentUsername)) {
            throw new ForbiddenException("You don't have permission");
        }

        interestRepository.delete(interest);
    }

    public Interest getInterest(Long id) {
        return interestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interest not found"));
    }
}
