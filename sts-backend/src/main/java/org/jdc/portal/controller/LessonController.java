package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.LessonCreateRequest;
import org.jdc.portal.dto.request.LessonUpdateRequest;
import org.jdc.portal.dto.response.LessonResponse;
import org.jdc.portal.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<LessonResponse>> getLessonsByBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(lessonService.getLessonsByBatchId(batchId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonResponse> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @PostMapping
    public ResponseEntity<LessonResponse> createLesson(@Valid @RequestBody LessonCreateRequest request) {
        LessonResponse response = lessonService.createLesson(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LessonResponse> updateLesson(
            @PathVariable Long id,
            @Valid @RequestBody LessonUpdateRequest request
    ) {
        return ResponseEntity.ok(lessonService.updateLesson(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }
}