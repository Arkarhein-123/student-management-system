package org.jdc.portal.dto;

import lombok.Builder;
import org.jdc.portal.entity.Role;

@Builder
public record AuthResponse(
        String name,
        String email,
        Role role,
        boolean isLoggedIn
) {
}
