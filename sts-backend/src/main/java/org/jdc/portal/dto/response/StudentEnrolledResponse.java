package org.jdc.portal.dto.response;

import lombok.Builder;
import org.jdc.portal.entity.EnrollmentStatus;

@Builder
public record StudentEnrolledResponse(
    Long enrollmentId,
    Long batchId,
    String batchCode,
    String courseName,
    String imageUrl,
    EnrollmentStatus status,
    int progressPercent
) {
}
