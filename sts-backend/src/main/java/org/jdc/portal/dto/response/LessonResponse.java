package org.jdc.portal.dto.response;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record LessonResponse(
    Long id,
    String title,
    String moduleName,
    String recordingUrl,
    String materialUrl,
    LocalDate publishDate
) {
}
