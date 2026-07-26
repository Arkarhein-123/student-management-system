package org.jdc.portal.mapper;

import org.jdc.portal.dto.request.LessonCreateRequest;
import org.jdc.portal.dto.request.LessonUpdateRequest;
import org.jdc.portal.dto.response.LessonResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "title", source = "request.title")
    @Mapping(target = "moduleName", source = "request.moduleName")
    @Mapping(target = "recordingUrl", source = "request.recordingUrl")
    @Mapping(target = "materialUrl", source = "request.materialUrl")
    @Mapping(target = "publishDate", source = "request.publishDate")
    @Mapping(target = "batch", source = "batch")
    Lesson toEntity(LessonCreateRequest request, Batch batch);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "batch", ignore = true)
    void updateEntityFromRequest(LessonUpdateRequest request, @MappingTarget Lesson lesson);

    LessonResponse toResponse(Lesson lesson);
}