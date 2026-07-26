package org.jdc.portal.dto.response;

import lombok.Builder;
import org.jdc.portal.entity.Role;

@Builder
public record AuthResponse(
        Long id,
        String token,
        String name,
        String email,
        Role role,
        boolean isLoggedIn
) {}
