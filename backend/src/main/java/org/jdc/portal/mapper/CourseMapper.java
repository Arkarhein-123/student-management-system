package org.jdc.portal.mapper;

import org.jdc.portal.dto.CourseCreateRequest;
import org.jdc.portal.dto.CourseResponse;
import org.jdc.portal.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponse toResponse(Course course);
    Course toEntity(CourseCreateRequest request);
}
