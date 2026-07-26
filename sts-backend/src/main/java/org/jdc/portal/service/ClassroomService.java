package org.jdc.portal.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.response.ClassroomDetailResponse;
import org.jdc.portal.entity.Batch;
import org.jdc.portal.entity.Lesson;
import org.jdc.portal.mapper.ClassroomMapper;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.LessonRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassroomService {
    private final LessonRepository lessonRepository;
    private final BatchRepository batchRepository;
    private final ClassroomMapper classroomMapper;

    @Transactional(readOnly = true)
    public ClassroomDetailResponse getClassroomDetails(Long batchId){
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new EntityNotFoundException("Batch Not found with Id : "+batchId));
        List<Lesson> lessons= lessonRepository.findLessonByBatchId(batchId);
        return classroomMapper.toClassRoomDetailResponse(batch,lessons);
    }
}
