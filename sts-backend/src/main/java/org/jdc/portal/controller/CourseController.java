package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.CourseCreateRequest;
import org.jdc.portal.dto.response.CourseDetailsResponse;
import org.jdc.portal.dto.response.CourseResponse;
import org.jdc.portal.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/courses")
//@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService courseService;

    // localhost:8080/api/v1/courses/get-courses
    @GetMapping("/get-courses")
    public ResponseEntity<List<CourseResponse>> getAllCourses(){
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CourseCreateRequest request){
        CourseResponse createCourse = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createCourse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long id, @Valid @RequestBody CourseCreateRequest request
    ){
        CourseResponse updateCourse  = courseService.updateCourse(id,request);
        return ResponseEntity.ok(updateCourse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }


    // localhost:8080/api/v1/courses/1/details?studentId=16
    @GetMapping("/{courseId}/details")
    public ResponseEntity<CourseDetailsResponse> getCourseDetails(
            @PathVariable Long courseId, @RequestParam Long studentId
    ){
        CourseDetailsResponse response = courseService.getCourseDetails(studentId,courseId);
        return ResponseEntity.ok(response);
    }
}
