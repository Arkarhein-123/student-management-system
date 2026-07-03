package org.jdc.portal.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CourseResponse(
        Long id,
        String courseName,
        String description,
        String duration,
        BigDecimal fees
) {
}
