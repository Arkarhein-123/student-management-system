package org.jdc.portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record LessonCreateRequest(
        @NotNull(message = "Batch ID is required")
        Long batchId,

        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title cannot exceed 100 characters")
        String title,

        @NotBlank(message = "Module name is required")
        @Size(max = 100, message = "Module name cannot exceed 100 characters")
        String moduleName,

        @Size(max = 150, message = "Recording URL cannot exceed 150 characters")
        String recordingUrl,

        @Size(max = 150, message = "Material URL cannot exceed 150 characters")
        String materialUrl,

        @NotNull(message = "Publish date is required")
        LocalDate publishDate
) {
}
