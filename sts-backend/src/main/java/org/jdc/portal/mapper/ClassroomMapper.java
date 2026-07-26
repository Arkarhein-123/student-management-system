package org.jdc.portal.mapper;

import org.jdc.portal.dto.response.ClassroomDetailResponse;
import org.jdc.portal.dto.response.LessonResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClassroomMapper {
    LessonResponse toLessonResponse(Lesson lesson);

    @Mapping(target = "batchId", source = "batch.id")
    @Mapping(target = "batchCode", source = "batch.batchCode")
    @Mapping(target = "courseTitle", source = "batch.course.courseName")
    @Mapping(target = "startDate", source = "batch.startDate")
    @Mapping(target = "scheduleInfo", source = "batch.scheduleInfo")
    @Mapping(target = "format", source = "batch.format")
    @Mapping(target = "cohortLevel", source = "batch.cohortLevel")
    @Mapping(target = "teacherName", source = "batch.teacher.name")
    @Mapping(target = "lessons", source = "lessons")
    ClassroomDetailResponse toClassRoomDetailResponse(Batch batch, List<Lesson> lessons);

}
