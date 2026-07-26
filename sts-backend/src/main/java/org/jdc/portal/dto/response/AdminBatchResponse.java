package org.jdc.portal.dto.response;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record AdminBatchResponse(
        Long id,
        String batchCode,
        LocalDate startDate,
        String scheduleInfo,
        String format,
        String cohortLevel,
        int maxSeats,
        int enrolledSeats,
        Long courseId,
        String courseName,
        Long teacherId,
        String teacherName
) {}