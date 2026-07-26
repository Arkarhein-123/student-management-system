package org.jdc.portal.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record BatchCreateRequest(
        @NotNull(message = "Course ID is required")
        Long courseId,

        @NotBlank(message = "Batch code is required")
        String batchCode,

        @NotNull(message = "Teacher ID is required")
        Long teacherId,

        @NotNull(message = "Start date is required")
        LocalDate startDate,

        @NotBlank(message = "Schedule info is required")
        String scheduleInfo,

        @NotBlank(message = "Format is required")
        String format,

        @NotBlank(message = "Cohort level is required")
        String cohortLevel,

        @Min(value = 1, message = "Max seats must be at least 1")
        int maxSeats
) {
}
