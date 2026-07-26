package org.jdc.portal.dto.request;

import jakarta.validation.constraints.NotNull;

public record UserStatusUpdateRequest(
        @NotNull(message = "isActive field is required")
        Boolean isActive
) {}