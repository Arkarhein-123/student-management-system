package org.jdc.portal.mapper;

import org.jdc.portal.dto.AuthResponse;
import org.jdc.portal.dto.RegisterRequest;
import org.jdc.portal.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper{
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequest request);

    @Mapping(target = "isLoggedIn",constant = "true")
    AuthResponse toAuthResponse(User user);
}
