package com.devteria.identityservice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j(topic = "Cloudinary-Service")
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    // upload file to Cloudinary
    public String uploadFile(MultipartFile file, String folderName, String fileName) {
        Map uploadParams = ObjectUtils.asMap(
                "folder", folderName,
                "public_id", fileName,
                "overwrite", true
        );
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);
            String url = uploadResult.get("secure_url").toString();
            log.info("Upload file successfully with url: {}", url);
            return url;
        } catch (IOException e){
            log.error("Upload failed, error {}", e.getMessage());
            throw new AppException(ErrorCode.UPLOAD_FILE_FAILED);
        }
    }

    //delete file
    @Async("taskExecutor")
    public void deleteFile(String url){
        String cloudinaryUrl = "https://res.cloudinary.com/deq6qkrq5/image/upload/v1746438269/";
        String publicId = "";
        if (url != null && url.contains("/upload/")) {
            publicId = url.substring(cloudinaryUrl.length());
            publicId = publicId.substring(0, publicId.lastIndexOf("."));
        } else {
            log.error("Invalid Cloudinary URL: {}", url);
        }
        try {
            Map<String, Object> deleteParams = ObjectUtils.asMap(
                    "invalidate", true
            );
            cloudinary.uploader().destroy(publicId, deleteParams);
            log.info("Deleted file from Cloudinary with publicId: {}", publicId);
        } catch (Exception e) {
            log.error("Failed to delete file from Cloudinary, error: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
