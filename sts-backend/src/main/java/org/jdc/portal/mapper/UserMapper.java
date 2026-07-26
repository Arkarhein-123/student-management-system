package org.jdc.portal.mapper;

import org.jdc.portal.dto.request.UserCreateRequest;
import org.jdc.portal.dto.response.UserResponse;
import org.jdc.portal.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    @Mapping(target = "isActive", source = "active")
    UserResponse toUserResponse(User user);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "active", constant = "true")
    User toUser(UserCreateRequest request);
}
