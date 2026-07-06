package org.jdc.portal.mapper;

import org.jdc.portal.dto.CourseCreateRequest;
import org.jdc.portal.dto.CourseResponse;
import org.jdc.portal.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CourseMapper {
    CourseResponse toResponse(Course course);
    Course toEntity(CourseCreateRequest request);
}
