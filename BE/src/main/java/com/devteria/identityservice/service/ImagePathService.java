package com.devteria.identityservice.service;

import com.devteria.identityservice.entity.ImagePath;
import com.devteria.identityservice.exception.ResourceNotFoundException;
import com.devteria.identityservice.repository.ImagePathRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImagePathService {

    private final ImagePathRepository imagePathRepository;
    private final CloudinaryService cloudinaryService;

    public ImagePath saveImageUpload(ImagePath.ReferenceEntity referenceType, Long referenceId,
                                     String url, String fileName
    ) {
        ImagePath imagePath = ImagePath.builder()
                .fileName(fileName)
                .url(url)
                .uploadedAt(LocalDateTime.now())
                .referenceId(referenceId)
                .referenceType(referenceType)
                .build();

        return imagePathRepository.save(imagePath);
    }

    public List<ImagePath> getImagePathForEntity(ImagePath.ReferenceEntity referenceType, Long referenceId) {
        return imagePathRepository.findAllForReferenceEntity(referenceType, referenceId);
    }

    public ImagePath update(Long imagePathId, String url, String fileName) {
        ImagePath imagePath = getImagePath(imagePathId);
        imagePath.setUrl(url);
        imagePath.setFileName(fileName);
        imagePath.setUploadedAt(LocalDateTime.now());
        return imagePathRepository.save(imagePath);
    }

    public ImagePath getImagePath(Long imagePathId) {
        return imagePathRepository.findById(imagePathId)
                .orElseThrow(() -> new ResourceNotFoundException("Image url not found"));
    }

    public void deleteAllByIds(List<Long> ids) {
        List<ImagePath> list = imagePathRepository.findAllById(ids);
        for (ImagePath image : list) {
            cloudinaryService.deleteFile(image.getUrl()); // Xóa file từ Cloudinary
            imagePathRepository.delete(image); // Xóa bản ghi khỏi DB
        }
    }

    public void deleteListOfEntity(ImagePath.ReferenceEntity referenceType, Long referenceId){
        List<ImagePath> list = getImagePathForEntity(referenceType, referenceId);
        for (ImagePath image : list) {
            cloudinaryService.deleteFile(image.getUrl()); // Xóa file từ Cloudinary
            imagePathRepository.delete(image); // Xóa bản ghi khỏi DB
        }
    }


}
