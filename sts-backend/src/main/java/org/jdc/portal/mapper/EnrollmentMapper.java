package org.jdc.portal.mapper;

import org.jdc.portal.dto.response.BatchStudentResponse;
import org.jdc.portal.entity.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EnrollmentMapper {
    @Mapping(target = "studentId", source = "student.id")
    @Mapping(target = "name", source = "student.name")
    @Mapping(target = "email", source = "student.email")
    BatchStudentResponse toBatchStudentResponse(Enrollment enrollment);

    List<BatchStudentResponse> toBatchStudentResponseList(List<Enrollment> enrollments);
}
