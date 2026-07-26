package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.CourseCreateRequest;
import org.jdc.portal.dto.response.BatchesDetailsResponse;
import org.jdc.portal.dto.response.CourseDetailsResponse;
import org.jdc.portal.dto.response.CourseResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Course;
import org.jdc.portal.mapper.BatchMapper;
import org.jdc.portal.mapper.CourseMapper;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.CourseRepository;
import org.jdc.portal.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final BatchMapper batchMapper;
    private final BatchRepository batchRepository;
    private final EnrollmentRepository enrollmentRepository;

    public List<CourseResponse> getAllCourses(){
        return courseRepository.findAll().stream()
                .map(course -> {
                    boolean isAvailable = batchRepository.existsByCourseId(course.getId());
                    return courseMapper.toResponse(course, isAvailable);
                })
                .toList();
    }

    @Transactional
    public CourseResponse createCourse(CourseCreateRequest request){
        Course course = courseMapper.toEntity(request);
        Course savedCourse = courseRepository.save(course);
        return courseMapper.toResponse(savedCourse,false);
    }

    @Transactional
    public CourseResponse updateCourse(Long id,CourseCreateRequest request){
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course Not Found with id : "+ id));
        courseMapper.updateEntityFromRequest(request,course);
        Course updatedCourse = courseRepository.save(course);
        boolean isAvailable = batchRepository.existsByCourseId(updatedCourse.getId());
        return courseMapper.toResponse(updatedCourse,isAvailable);
    }

    @Transactional
    public void deleteCourse(Long id){
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course Not Found with id : "+ id));

        // Safety check: Prevent deletion if batches are currently linked to this template
        if (batchRepository.existsByCourseId(id)) {
            throw new IllegalStateException("Cannot delete course template while active batches are linked to it.");
        }

        courseRepository.delete(course);
    }

    public CourseDetailsResponse getCourseDetails(Long studentId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course Not Found with ID: " + courseId));

        List<BatchesDetailsResponse> batchDetails = batchRepository.findByCourseId(courseId).stream()
                .map(batch -> {
                    String status = enrollmentRepository.findByStudentIdAndBatchId(studentId, batch.getId())
                            .map(enrollment -> enrollment.getEnrollmentStatus().name())
                            .orElse("Not Enrolled");

                    return batchMapper.toBatchesDetailsResponse(batch, status);
                })
                .toList();

        return courseMapper.toDetailsResponse(course, batchDetails);
    }

}
