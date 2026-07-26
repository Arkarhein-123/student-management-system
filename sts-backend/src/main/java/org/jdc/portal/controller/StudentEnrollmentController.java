package org.jdc.portal.controller;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.response.StudentEnrolledResponse;
import org.jdc.portal.service.StudentEnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/enrollment")
//@CrossOrigin(origins = "http://localhost:5173")
public class StudentEnrollmentController {
    private final StudentEnrollmentService studentEnrollmentService;

    @GetMapping("/{studentId}/enrolled")
    public ResponseEntity<List<StudentEnrolledResponse>> getEnrolledCourses(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentEnrollmentService.getStudentEnrollments(studentId));
    }
}
