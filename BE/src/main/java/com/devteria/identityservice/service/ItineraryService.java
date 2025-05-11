package com.devteria.identityservice.service;

import com.devteria.identityservice.constant.FolderName;
import com.devteria.identityservice.dto.request.ItineraryRequest;
import com.devteria.identityservice.dto.response.InterestResponse;
import com.devteria.identityservice.dto.response.ItineraryResponse;
import com.devteria.identityservice.entity.ImagePath;
import com.devteria.identityservice.entity.Itinerary;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.BadRequestException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.exception.ResourceNotFoundException;
import com.devteria.identityservice.mapper.ImagePathMapper;
import com.devteria.identityservice.mapper.ItineraryMapper;
import com.devteria.identityservice.repository.ItineraryRepository;
import com.devteria.identityservice.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.devteria.identityservice.entity.ImagePath.ReferenceEntity.FEEDBACK;
import static com.devteria.identityservice.entity.ImagePath.ReferenceEntity.ITINERARY;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "Itinerary-Service")
public class ItineraryService {
    private final ImagePathMapper imagePathMapper;

    private final ItineraryRepository itineraryRepository;
    private final TourRepository tourRepository;
    private final ItineraryMapper itineraryMapper;
    private final ImagePathService imagePathService;
    private final CloudinaryService cloudinaryService;

    @Transactional(rollbackFor = Exception.class)
    public ItineraryResponse create(ItineraryRequest request, MultipartFile[] images) {
        try {
            existsItineraryWithTourIdAndDayNumber(request.getTourId(), request.getDayNumberOfTour());

            Tour tour = getTourById(request.getTourId());
            validateDayNumber(tour, request.getDayNumberOfTour());

            Itinerary newItinerary = itineraryMapper.toItinerary(request);
            newItinerary.setTour(tour);
            Itinerary itinerary = itineraryRepository.save(newItinerary);
            if ( images != null && images.length > 0) {
                uploadImages(images, itinerary.getItineraryId());
            }

            ItineraryResponse response = itineraryMapper.toItineraryResponse(itinerary);
            List<ImagePath> imagePathList = imagePathService.getImagePathForEntity(ITINERARY, Long.valueOf(itinerary.getItineraryId()));
            response.setImages(imagePathList.stream().map(imagePathMapper::toImagePathResponse).toList());

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw e;
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public ItineraryResponse update(Integer itineraryId, ItineraryRequest request) {
        Itinerary existingItinerary = getItinerary(itineraryId);

        // nếu tour id hoặc ngày trong tour bị thay đổi thì kiểm tra xem nó đã tồn tại hay chưa
        if (!request.getTourId().equals(existingItinerary.getTour().getTourId())
            || !request.getDayNumberOfTour().equals(existingItinerary.getDayNumber())
        ) {
            existsItineraryWithTourIdAndDayNumber(request.getTourId(), request.getDayNumberOfTour());
            Tour tour = getTourById(request.getTourId());
            validateDayNumber(tour, request.getDayNumberOfTour());

            existingItinerary.setTour(tour);
            existingItinerary.setDayNumber(request.getDayNumberOfTour());
        }

        existingItinerary.setLocation(request.getLocation());
        existingItinerary.setTitle(request.getTitle());
        existingItinerary.setActivityDescription(request.getActivityDescription());

        return itineraryMapper.toItineraryResponse(itineraryRepository.save(existingItinerary));
    }

    public ItineraryResponse uploadImageForItinerary(Integer itineraryId, MultipartFile[] images) {
        Itinerary itinerary = getItinerary(itineraryId);
        if ( images != null && images.length > 0) {
            uploadImages(images, itineraryId);
        }
        ItineraryResponse response = itineraryMapper.toItineraryResponse(itinerary);
        List<ImagePath> imagePathList = imagePathService.getImagePathForEntity(ITINERARY, Long.valueOf(itineraryId));
        response.setImages(imagePathList.stream().map(imagePathMapper::toImagePathResponse).toList());
        return response;
    }

    public List<ImagePath> uploadImages(MultipartFile[] images, Integer itineraryId) {
        String folderName = FolderName.ITINERARY_IMAGES;
        return Arrays.stream(images)
                .parallel()
                .map(image -> {
                    String fileName = UUID.randomUUID().toString();
                    String url = cloudinaryService.uploadFile(image, folderName, fileName);
                    return  imagePathService.saveImageUpload(ITINERARY, Long.valueOf(itineraryId), url, fileName, null);
                })
                .toList();
    }

    public ItineraryResponse getItineraryById(Integer itineraryId) {
        Itinerary itinerary = getItinerary(itineraryId);
        List<ImagePath> imagePaths = imagePathService.getImagePathForEntity(
                ITINERARY,
                Long.valueOf(itineraryId)
        );
        ItineraryResponse response = itineraryMapper.toItineraryResponse(itinerary);
        response.setImages(imagePaths.stream()
                .map(imagePathMapper::toImagePathResponse)
                .toList()
        );
        return response;
    }

    public List<ItineraryResponse> getItineraryForTour(Long tourId) {
        List<Itinerary> itineraries = itineraryRepository.findAllByTour(tourId);
        return itineraries.stream()
                .map(itinerary -> {
                    List<ImagePath> imagePaths = imagePathService.getImagePathForEntity(
                            ITINERARY,
                            itinerary.getItineraryId().longValue()
                    );
                    ItineraryResponse response = itineraryMapper.toItineraryResponse(itinerary);
                    response.setImages(
                            imagePaths.stream()
                                    .map(imagePathMapper::toImagePathResponse)
                                    .toList()
                    );
                    return response;
                })
                .toList();
    }

    public void delete(Integer itineraryId) {
        Itinerary itinerary = getItinerary(itineraryId);
        itineraryRepository.delete(itinerary);
        imagePathService.deleteListOfEntity(ITINERARY, itineraryId.longValue());
    }

    public Itinerary getItinerary(Integer itineraryId) {
        return itineraryRepository.findById(itineraryId)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary Not found"));
    }

    private Tour getTourById(Long tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new ResourceNotFoundException("Tour Not Found"));
    }

    private void existsItineraryWithTourIdAndDayNumber(Long tourId, Integer dayNumber) {
        if(itineraryRepository.existsByTourIdAndDayNumber(tourId, dayNumber)) {
            throw new BadRequestException("Day number of Tour existed");
        }
    }

    private void validateDayNumber(Tour tour, Integer dayNumber) {
        long days = ChronoUnit.DAYS.between(tour.getStartDate(), tour.getEndDate()) + 1;
        if(days < dayNumber) {
            throw new BadRequestException("Day number of Tour invalid");
        }
    }
}
