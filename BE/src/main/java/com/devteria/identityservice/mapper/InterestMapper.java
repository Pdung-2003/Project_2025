package com.devteria.identityservice.mapper;

import com.devteria.identityservice.dto.response.InterestResponse;
import com.devteria.identityservice.entity.Interest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InterestMapper {

    @Mapping(target = "userId", source = "user.id")
    InterestResponse toResponse(Interest interest);
}
