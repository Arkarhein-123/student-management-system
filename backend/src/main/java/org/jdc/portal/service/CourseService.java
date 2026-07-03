package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.CourseCreateRequest;
import org.jdc.portal.dto.CourseResponse;
import org.jdc.portal.entity.Course;
import org.jdc.portal.mapper.CourseMapper;
import org.jdc.portal.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public List<CourseResponse> getAllCourses(){
        return courseRepository.findAll().stream()
                .map(courseMapper::toResponse)
                .toList();
    }

    public CourseResponse createCourse(CourseCreateRequest request){
        Course course = courseMapper.toEntity(request);
        Course savedCourse = courseRepository.save(course);
        return courseMapper.toResponse(savedCourse);
    }
}
