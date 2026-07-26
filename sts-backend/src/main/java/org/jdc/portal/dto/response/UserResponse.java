package org.jdc.portal.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import org.jdc.portal.entity.Role;

@Builder
public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        @JsonProperty("isActive")
        Boolean isActive
) {}
