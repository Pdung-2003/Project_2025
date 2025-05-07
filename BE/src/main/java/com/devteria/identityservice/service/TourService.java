package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.TourFilterRequest;
import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.BadRequestException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.TourMapper;
import com.devteria.identityservice.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final TourMapper tourMapper;
    private final UserService userService;
    private final CloudinaryService cloudinaryService;

    // Tạo mới tour
    @Transactional(rollbackFor = Exception.class)
    public TourResponse createTour(TourRequest request, MultipartFile file) {
        Tour tour = tourMapper.toEntity(request);
        User manager = userService.getUser(request.getManagerId());
        tour.setManager(manager);
        tour.setStatus(Tour.Status.ACTIVE);
        tour.setAvailableTicket(request.getMaxCapacity());

        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.contains(".")) {
            fileName = fileName.substring(0, fileName.lastIndexOf("."));
        }
        String bannerUrl = cloudinaryService.uploadFile(file, "tour-banner", fileName);
        tour.setTourBanner(bannerUrl);
        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }
    public TourResponse getTourById(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        return tourMapper.toResponse(tour);
    }


    public Tour getTour(Long tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXISTED));
    }

    @Transactional(readOnly = true)
    public TourResponse getTourById(Long tourId) {
        Tour tour = getTour(tourId);
        return tourMapper.toResponse(tour);
    }

    @Transactional(rollbackFor = Exception.class)
    public TourResponse updateTour(Long tourId, TourRequest tourRequest, MultipartFile file) {
        Tour existingTour = getTour(tourId);
        if(tourRequest != null) {
            existingTour = updateTourData(existingTour, tourRequest);
        }
        if (!file.isEmpty()) {
            existingTour = updateTourBanner(file, existingTour);
        }
        return tourMapper.toResponse(tourRepository.save(existingTour));
    }

    // Cập nhật tour
    public Tour updateTourData(Tour existingTour, TourRequest tourRequest) {

        existingTour = tourMapper.updateTour(tourRequest, existingTour);

        if (!existingTour.getManager().getId().equals(tourRequest.getManagerId())) {
            User manager = userService.getUser(tourRequest.getManagerId());
            existingTour.setManager(manager);
        }
        return existingTour;
    }

    private Tour updateTourBanner(MultipartFile file, Tour existingTour) {
        String oldBannerUrl = existingTour.getTourBanner();
        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.contains(".")) {
            fileName = fileName.substring(0, fileName.lastIndexOf("."));

        }
        String bannerUrl = cloudinaryService.uploadFile(file, "tour-banner", fileName);
        existingTour.setTourBanner(bannerUrl);
        cloudinaryService.deleteFile(oldBannerUrl);

        return existingTour;
    }

    public Page<TourResponse> searchTour(TourFilterRequest request) {
        Sort sort = Sort.unsorted();
        if (request.getSort() != null && !request.getSort().isEmpty()) {
            String[] sortFilters = request.getSort().split(",");
            for (String s : sortFilters) {
                String[] order = s.split(":");
                String property = order[0];
                String direction = order[1].toLowerCase();
                sort.and(Sort.by(direction.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, property));
            }
        }

        Pageable pageable = PageRequest.of(request.getPageNumber(), request.getPageSize(), sort);
        Page<Tour> tours = tourRepository.searchTour(
                request.getTourName(),
                request.getLocation(), request.getDestination(),
                request.getStartDateFrom(), request.getStartDateTo(),
                request.getMinPrice(), request.getMaxPrice(),
                request.getStatus(),
                request.getManagerId(),
                request.getCompany(),
                pageable);

        return tours.map(tourMapper::toResponse);
    }

    // Xóa tour
    public void deleteTour(Long tourId) {
        tourRepository.deleteById(tourId);
    }

    public void holdTicketForTour(Tour tour, Integer numberOfTicket) {
        int availableTicket = tour.getAvailableTicket();
        if (availableTicket >= numberOfTicket) {
            tour.setAvailableTicket(availableTicket - numberOfTicket);
        } else {
            throw new BadRequestException("No available slots");
        }
        tourRepository.save(tour);
    }
}
