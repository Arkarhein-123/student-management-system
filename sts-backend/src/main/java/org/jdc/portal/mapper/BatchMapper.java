package org.jdc.portal.mapper;

import org.jdc.portal.dto.request.BatchCreateRequest;
import org.jdc.portal.dto.response.AdminBatchResponse;
import org.jdc.portal.dto.response.BatchesDetailsResponse;
import org.jdc.portal.entity.Batch;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BatchMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "enrolledSeats", ignore = true)
    Batch toBatch(BatchCreateRequest request);

    // Updates existing Batch instance in-place
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "enrolledSeats", ignore = true)
    void updateBatchFromDto(BatchCreateRequest request, @MappingTarget Batch batch);

    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.courseName")
    @Mapping(target = "teacherId", source = "teacher.id")
    @Mapping(target = "teacherName", source = "teacher.name")
    AdminBatchResponse toAdminBatchResponse(Batch batch);

    List<AdminBatchResponse> toAdminBatchResponseList(List<Batch> batches);

    @Mapping(target = "id", source = "batch.id")
    @Mapping(target = "teacherName", source = "batch.teacher.name")
    @Mapping(target = "studentEnrollmentStatus", source = "status")
    BatchesDetailsResponse toBatchesDetailsResponse(Batch batch, String status);

    List<BatchesDetailsResponse> toBatchesDetailsResponseList(List<Batch> batches);
}