package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.LessonCreateRequest;
import org.jdc.portal.dto.request.LessonUpdateRequest;
import org.jdc.portal.dto.response.LessonResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Lesson;
import org.jdc.portal.mapper.LessonMapper;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonService {

    private final LessonRepository lessonRepository;
    private final BatchRepository batchRepository;
    private final LessonMapper lessonMapper;

    public List<LessonResponse> getLessonsByBatchId(Long batchId) {
        if (!batchRepository.existsById(batchId)) {
            throw new IllegalArgumentException("Batch not found with ID: " + batchId);
        }
        return lessonRepository.findLessonByBatchId(batchId)
                .stream()
                .map(lessonMapper::toResponse)
                .toList();
    }

    public LessonResponse getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with ID: " + id));
        return lessonMapper.toResponse(lesson);
    }

    @Transactional
    public LessonResponse createLesson(LessonCreateRequest request) {
        Batch batch = batchRepository.findById(request.batchId())
                .orElseThrow(() -> new IllegalArgumentException("Batch not found with ID: " + request.batchId()));

        Lesson lesson = lessonMapper.toEntity(request, batch);
        Lesson savedLesson = lessonRepository.save(lesson);

        return lessonMapper.toResponse(savedLesson);
    }

    @Transactional
    public LessonResponse updateLesson(Long id, LessonUpdateRequest request) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found with ID: " + id));

        lessonMapper.updateEntityFromRequest(request, lesson);
        // Dirty checking handles updates upon transaction commit

        return lessonMapper.toResponse(lesson);
    }

    @Transactional
    public void deleteLesson(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new IllegalArgumentException("Lesson not found with ID: " + id);
        }
        lessonRepository.deleteById(id);
    }
}