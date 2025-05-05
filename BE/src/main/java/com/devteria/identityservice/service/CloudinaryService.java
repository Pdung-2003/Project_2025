package com.devteria.identityservice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "deq6qkrq5",
                "api_key", "351231857363369",
                "api_secret", "v3FDad5YAriUwrH6NT0LVneav3k"
                // API envi variable CLOUDINARY_URL=cloudinary://351231857363369:v3FDad5YAriUwrH6NT0LVneav3k@deq6qkrq5
        ));
    }

    public String upload(MultipartFile file) throws IOException {
        Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return result.get("secure_url").toString();
    }
}
