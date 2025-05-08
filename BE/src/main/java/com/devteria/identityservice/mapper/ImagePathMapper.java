package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.response.ImagePathResponse;
import com.devteria.identityservice.entity.ImagePath;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ImagePathMapper {

    @Mapping(target = "imagePathId", source = "id")
    ImagePathResponse toImagePathResponse(ImagePath imagePath);
}
