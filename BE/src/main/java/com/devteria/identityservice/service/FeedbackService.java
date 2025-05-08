package com.devteria.identityservice.service;

import com.devteria.identityservice.constant.FolderName;
import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.FeedbackRequest;
import com.devteria.identityservice.dto.request.FeedbackUpdateRequest;
import com.devteria.identityservice.dto.response.FeedbackResponse;
import com.devteria.identityservice.dto.response.RatingResponse;
import com.devteria.identityservice.entity.*;
import com.devteria.identityservice.exception.*;
import com.devteria.identityservice.mapper.FeedbackMapper;
import com.devteria.identityservice.mapper.ImagePathMapper;
import com.devteria.identityservice.repository.FeedbackRepository;
import com.devteria.identityservice.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static com.devteria.identityservice.entity.ImagePath.ReferenceEntity.FEEDBACK;

@Service
@Slf4j(topic = "Feedback-Service")
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final BookingService bookingService;
    private final FeedbackMapper feedbackMapper;
    private final CloudinaryService cloudinaryService;
    private final ImagePathService imagePathService;
    private final ImagePathMapper imagePathMapper;
    private final TourRepository tourRepository;

    @Transactional(rollbackFor = Exception.class)
    public FeedbackResponse createFeedback(FeedbackRequest request, String username, MultipartFile[] images) {
        Booking booking = bookingService.getBooking(request.getBookingId());
        Tour tour = booking.getTour();
        User user = booking.getCustomer();

        if(!user.getUsername().equals(username)) {
            throw new ForbiddenException("You do not have permission");
        }

        if (feedbackRepository.existsByCustomerIdAndBookingId(user.getId(), booking.getBookingId())) {
            throw new BadRequestException("You have already submitted feedback for this tour");
        }

        if( !booking.getStatus().equals(Booking.Status.PAID)
            || booking.getTourDate().isAfter(LocalDate.now())
        ) {
            throw new BadRequestException("Participation and full payment are required to submit a feedback");
        }

        Feedback feedback = feedbackMapper.toFeedback(request);
        feedback.setTour(tour);
        feedback.setBooking(booking);
        feedback.setCustomer(user);

        FeedbackResponse response = feedbackMapper.toResponse(feedbackRepository.save(feedback));
        List<ImagePath> imagePaths = uploadImages(images, response.getFeedbackId());
        response.setImages(imagePaths.stream().map(imagePathMapper::toImagePathResponse).toList());

        return response;
    }

    public List<ImagePath> uploadImages(MultipartFile[] images, Integer feedbackId) {
        String folderName = FolderName.FEEDBACK_IMAGES;
        return Arrays.stream(images)
                .parallel()
                .map(image -> {
                    String fileName = generateUniqueFileName();
                    String url = cloudinaryService.uploadFile(image, folderName, fileName);
                    return  imagePathService.saveImageUpload(FEEDBACK, Long.valueOf(feedbackId), url, fileName);

                })
                .toList();
    }

    public FeedbackResponse getOne(Integer feedbackId) {
        Feedback feedback = getFeedback(feedbackId);
        FeedbackResponse response = feedbackMapper.toResponse(feedback);
        List<ImagePath> imagePathList = imagePathService.getImagePathForEntity(FEEDBACK, Long.valueOf(feedbackId));
        response.setImages(imagePathList.stream().map(imagePathMapper::toImagePathResponse).toList());
        return response;
    }

    public Page<FeedbackResponse> getAllForTour(Long tourId, Integer pageNumber, Integer pageSize) {
        Tour tour = getTour(tourId);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Feedback> feedbackPage = feedbackRepository.findAllByTour(tour, pageable);
        return feedbackPage.map(feedback -> getOne(feedback.getFeedbackId()));
    }

    public RatingResponse getRatingForTour(Long tourId) {
        Double avgRating = feedbackRepository.findAverageRatingByTourId(tourId);
        if (avgRating == null) {
            avgRating = 0.0;
        }
        Integer oneStar = feedbackRepository.countByTourIdAndRating(tourId, 1);
        Integer twoStar = feedbackRepository.countByTourIdAndRating(tourId, 2);
        Integer threeStar = feedbackRepository.countByTourIdAndRating(tourId, 3);
        Integer fourStar = feedbackRepository.countByTourIdAndRating(tourId, 4);
        Integer fiveStar = feedbackRepository.countByTourIdAndRating(tourId, 5);

        return RatingResponse.builder()
                .avgRating(avgRating)
                .oneStar(oneStar)
                .twoStar(twoStar)
                .threeStar(threeStar)
                .fourStar(fourStar)
                .fiveStar(fiveStar)
                .build();
    }

    public FeedbackResponse update(Integer feedbackId, FeedbackUpdateRequest request, MultipartFile[] images) {
        Feedback feedback = getFeedback(feedbackId);

        User customer = feedback.getCustomer();
        assertCanModifyFeedbackByCustomer(customer);

        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setUpdatedAt(LocalDateTime.now());

        feedback = feedbackRepository.save(feedback);
        FeedbackResponse response = feedbackMapper.toResponse(feedback);

        if ( images != null && images.length > 0) {
            uploadImages(images, feedbackId);
        }

        List<ImagePath> imagePathList = imagePathService.getImagePathForEntity(FEEDBACK, Long.valueOf(feedbackId));
        response.setImages(imagePathList.stream().map(imagePathMapper::toImagePathResponse).toList());
        return response;
    }

    public void deleteImagePathOfFeedback(List<Long> ids) {
        imagePathService.deleteAllByIds(ids);
    }

    public void deleteFeedback(Integer feedbackId) {
        Feedback feedback = getFeedback(feedbackId);
        User customer = feedback.getCustomer();
        assertCanModifyFeedbackByCustomer(customer);

        feedbackRepository.delete(feedback);
        imagePathService.deleteListOfEntity(FEEDBACK, Long.valueOf(feedback.getFeedbackId()));
    }

    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }

    public Feedback getFeedback(Integer id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
    }

    private Tour getTour(Long tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
    }

    private boolean isRoleAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_" + PredefinedRole.ADMIN_ROLE));
    }

    private void assertCanModifyFeedbackByCustomer(User customer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!isRoleAdmin(authentication)) {
            String currentUsername = authentication.getName();
            if(!customer.getUsername().equals(currentUsername)) {
                throw new ForbiddenException("You do not have permission");
            }
        }
    }

}
