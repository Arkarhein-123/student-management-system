package org.jdc.portal.dto.request;

import jakarta.validation.constraints.NotNull;
import org.jdc.portal.entity.Role;

public record UserRoleUpdateRequest(
        @NotNull(message = "role cannot be null")
        Role role
) {}
