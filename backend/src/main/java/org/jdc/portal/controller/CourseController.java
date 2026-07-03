package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.CourseCreateRequest;
import org.jdc.portal.dto.CourseResponse;
import org.jdc.portal.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService courseService;

    // localhost:8080/api/v1/courses
    @GetMapping("/get-courses")
    public ResponseEntity<List<CourseResponse>> getAllCourses(){
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/create-course")
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CourseCreateRequest request){
        CourseResponse createCourse = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createCourse);
    }
}
