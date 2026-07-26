package org.jdc.portal.dto.response;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record BatchesDetailsResponse(
        Long id,
        String batchCode,
        LocalDate startDate,
        String scheduleInfo,
        String format,
        String cohortLevel,
        int maxSeats,
        int enrolledSeats,
        String teacherName,
        String studentEnrollmentStatus
) {
}
