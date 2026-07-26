package org.jdc.portal.mapper;

import org.jdc.portal.dto.response.AuthResponse;
import org.jdc.portal.dto.request.RegisterRequest;
import org.jdc.portal.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper {
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequest request);

    @Mapping(target = "isLoggedIn", constant = "true")
    @Mapping(target = "token", source = "token")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    @Mapping(target = "id", source = "user.id")
    AuthResponse toAuthResponse(User user, String token);

    @Mapping(target = "isLoggedIn", constant = "false")
    @Mapping(target = "token", ignore = true)
    @Mapping(target = "id", source = "user.id")
    @Mapping(target = "name", source = "user.name")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "role", source = "user.role")
    AuthResponse toRegisterResponse(User user);
}
