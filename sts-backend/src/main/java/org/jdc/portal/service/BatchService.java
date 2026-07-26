package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.BatchCreateRequest;
import org.jdc.portal.dto.response.AdminBatchResponse;
import org.jdc.portal.dto.response.BatchStudentResponse;
import org.jdc.portal.dto.response.BatchesDetailsResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Course;
import org.jdc.portal.entity.Enrollment;
import org.jdc.portal.entity.User;
import org.jdc.portal.mapper.BatchMapper;
import org.jdc.portal.mapper.EnrollmentMapper;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.CourseRepository;
import org.jdc.portal.repository.EnrollmentRepository;
import org.jdc.portal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchService {

    private final BatchRepository batchRepository;
    private final BatchMapper batchMapper;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentMapper enrollmentMapper;

    @Transactional
    public AdminBatchResponse createBatch(BatchCreateRequest request) {
        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found with Id : " + request.courseId()));
        User teacher = userRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher Not Found with Id : " + request.teacherId()));

        Batch batch = batchMapper.toBatch(request);
        batch.setCourse(course);
        batch.setTeacher(teacher);
        batch.setEnrolledSeats(0); // Brand new batch starts with 0 seats enrolled

        return batchMapper.toAdminBatchResponse(batchRepository.save(batch));
    }

    @Transactional
    public AdminBatchResponse updateBatch(Long batchId, BatchCreateRequest request) {
        // 1. Fetch managed entity from DB
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch Not Found with Id : " + batchId));

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found with Id : " + request.courseId()));

        User teacher = userRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher Not Found with Id : " + request.teacherId()));

        // 2. Apply field updates directly to existing entity
        batchMapper.updateBatchFromDto(request, batch);
        batch.setCourse(course);
        batch.setTeacher(teacher);

        // Notice: batch.getEnrolledSeats() and batch.getId() are automatically preserved!

        return batchMapper.toAdminBatchResponse(batchRepository.save(batch));
    }

    @Transactional
    public void deleteBatch(Long batchId) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch Not Found with Id : " + batchId));

        if (batch.getEnrolledSeats() > 0) {
            throw new IllegalStateException("Cannot delete a batch that already has enrolled students.");
        }

        batchRepository.delete(batch);
    }

    @Transactional(readOnly = true)
    public List<AdminBatchResponse> getBatchesByCourse(Long courseId) {
        List<Batch> batches = batchRepository.findByCourseId(courseId);
        return batchMapper.toAdminBatchResponseList(batches);
    }

    @Transactional
    public List<BatchesDetailsResponse> getBatchesByUserId(Long userId) {
        List<Batch> batches = batchRepository.findByUserId(userId);
        return batchMapper.toBatchesDetailsResponseList(batches);
    }

    @Transactional(readOnly = true)
    public List<AdminBatchResponse> getAllBatches() {
        return batchMapper.toAdminBatchResponseList(batchRepository.findAll());
    }

    @Transactional(readOnly = true)
    public List<BatchStudentResponse> getStudentsByBatch(Long batchId){
        if(!batchRepository.existsById(batchId)){
            throw new RuntimeException("Batch Not Found with Id : " + batchId);
        }
        List<Enrollment> enrollments = enrollmentRepository.findByBatchId(batchId);
        return enrollmentMapper.toBatchStudentResponseList(enrollments);
    }
}