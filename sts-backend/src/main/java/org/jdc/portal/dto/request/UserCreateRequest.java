package org.jdc.portal.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import org.jdc.portal.entity.Role;

public record UserCreateRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Email is required")
        @Email(message = "Email is required")
        String email,
        @NotNull(message = "Password is required")
        @Length(min = 8, message = "Password must be at least 8 characters long")
        String password,
        @NotNull(message = "Role is required")
        Role role
) {
}
