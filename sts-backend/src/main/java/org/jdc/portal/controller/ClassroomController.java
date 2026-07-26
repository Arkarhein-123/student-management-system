package org.jdc.portal.controller;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.response.ClassroomDetailResponse;
import org.jdc.portal.service.ClassroomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/classrooms")
public class ClassroomController {
    private final ClassroomService classroomService;

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<ClassroomDetailResponse> getClassroomDetails(@PathVariable Long batchId){
        ClassroomDetailResponse details = classroomService.getClassroomDetails(batchId);
        return ResponseEntity.ok(details);
    }
}
