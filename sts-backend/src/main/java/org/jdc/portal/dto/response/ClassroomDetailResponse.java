package org.jdc.portal.dto.response;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record ClassroomDetailResponse(
        Long batchId,
        String batchCode,
        String courseTitle,
        LocalDate startDate,
        String scheduleInfo,
        String format,
        String cohortLevel,
        String teacherName,
        List<LessonResponse> lessons
) {
}
