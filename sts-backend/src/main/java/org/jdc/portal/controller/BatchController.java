package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.BatchCreateRequest;
import org.jdc.portal.dto.response.AdminBatchResponse;
import org.jdc.portal.dto.response.BatchStudentResponse;
import org.jdc.portal.dto.response.BatchesDetailsResponse;
import org.jdc.portal.service.BatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<List<AdminBatchResponse>> getAllBatches() {
        return ResponseEntity.ok(batchService.getAllBatches());
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<List<AdminBatchResponse>> getBatchesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(batchService.getBatchesByCourse(courseId));
    }

    @GetMapping("/{batchId}/students")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<BatchStudentResponse>> getStudentsByBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(batchService.getStudentsByBatch(batchId));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<BatchesDetailsResponse>> getBatchesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(batchService.getBatchesByUserId(userId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminBatchResponse> createBatch(@Valid @RequestBody BatchCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(batchService.createBatch(request));
    }

    @PutMapping("/{batchId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminBatchResponse> updateBatch(
            @PathVariable Long batchId,
            @Valid @RequestBody BatchCreateRequest request) {
        return ResponseEntity.ok(batchService.updateBatch(batchId, request));
    }

    @DeleteMapping("/{batchId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long batchId) {
        batchService.deleteBatch(batchId);
        return ResponseEntity.noContent().build();
    }


}