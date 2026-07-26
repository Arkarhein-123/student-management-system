package org.jdc.portal.mapper;

import org.jdc.portal.dto.request.CourseCreateRequest;
import org.jdc.portal.dto.response.BatchesDetailsResponse;
import org.jdc.portal.dto.response.CourseDetailsResponse;
import org.jdc.portal.dto.response.CourseResponse;
import org.jdc.portal.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CourseMapper {

    @Mapping(target = "isAvailable", source = "isAvailable")
    CourseResponse toResponse(Course course, boolean isAvailable);

    Course toEntity(CourseCreateRequest request);

    @Mapping(target = "id", source = "course.id")
    @Mapping(target = "batches", source = "batches")
    CourseDetailsResponse toDetailsResponse(Course course, List<BatchesDetailsResponse> batches);

    void updateEntityFromRequest(CourseCreateRequest request, @MappingTarget Course course);
}
