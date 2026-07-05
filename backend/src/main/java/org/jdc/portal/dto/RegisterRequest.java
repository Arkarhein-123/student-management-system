package org.jdc.portal.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "User name cannot be blank")
        @Size(max = 150, message = "User name cannot be longer than 150 characters")
        String name,

        @NotBlank(message = "Email cannot be blank")
        @Email(message = "Provide a valid email format")
        @Size(max = 150, message = "Email cannot be longer than 150 characters")
        String email,

        @NotBlank(message = "Password cannot be blank")
        @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
        String password
) {


}
