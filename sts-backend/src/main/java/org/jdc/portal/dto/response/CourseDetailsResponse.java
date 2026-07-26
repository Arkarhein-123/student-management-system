package org.jdc.portal.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record CourseDetailsResponse(
     Long id,
     String courseName,
     String description,
     String duration,
     BigDecimal fees,
     String category,
     String imageUrl,
     List<BatchesDetailsResponse> batches

) {}
