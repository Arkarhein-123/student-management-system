package org.jdc.portal.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "User name or email is required")
        String emailOrName,
        @NotBlank(message = "Password is required")
        String password
) {
}
