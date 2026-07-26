package org.jdc.portal.dto.response;

import lombok.Builder;
import org.jdc.portal.entity.EnrollmentStatus;

import java.time.LocalDateTime;

@Builder
public record BatchStudentResponse(
        Long studentId,
        String name,
        String email,
        LocalDateTime enrollmentDate,
        EnrollmentStatus enrollmentStatus
) {}
