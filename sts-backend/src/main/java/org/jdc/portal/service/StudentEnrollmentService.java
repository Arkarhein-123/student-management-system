package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.response.StudentEnrolledResponse;
import org.jdc.portal.entity.Enrollment;
import org.jdc.portal.mapper.StudentEnrollmentMapper;
import org.jdc.portal.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentEnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentEnrollmentMapper studentEnrollmentMapper;

    public List<StudentEnrolledResponse> getStudentEnrollments(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream().map(enrollment -> {
            int progress = calculateProgress(enrollment);
            return studentEnrollmentMapper.toStudentEnrolledResponse(enrollment, progress);
        }).collect(Collectors.toList());
    }


    private int calculateProgress(Enrollment enrollment) {
        try {
            var course = enrollment.getBatch().getCourse();
            String duration = course.getDuration();
            var startDate = enrollment.getBatch().getStartDate();

            if (duration == null || startDate == null) {
                return 0;
            }

            if (LocalDate.now().isBefore(startDate)) {
                return 0;
            }

            long totalWeeks = Long.parseLong(duration.replaceAll("[^0-9]", ""));
            long weeksCompleted = ChronoUnit.WEEKS.between(startDate, LocalDate.now());
            int percentage = (int) ((weeksCompleted * 100) / totalWeeks);
            return Math.clamp(percentage, 0, 100);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
