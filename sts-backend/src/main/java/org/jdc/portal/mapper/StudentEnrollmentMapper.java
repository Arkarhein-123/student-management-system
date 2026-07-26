package org.jdc.portal.mapper;

import org.jdc.portal.dto.response.StudentEnrolledResponse;
import org.jdc.portal.entity.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudentEnrollmentMapper {
    @Mapping(target = "enrollmentId",source = "enrollment.id")
    @Mapping(target = "batchId",source = "enrollment.batch.id")
    @Mapping(target = "batchCode",source = "enrollment.batch.batchCode")
    @Mapping(target = "courseName",source = "enrollment.batch.course.courseName")
    @Mapping(target = "imageUrl",source = "enrollment.batch.course.imageUrl")
    @Mapping(target = "status",source = "enrollment.enrollmentStatus")
    @Mapping(target = "progressPercent",source = "progressPercent")
    StudentEnrolledResponse toStudentEnrolledResponse(Enrollment enrollment, int progressPercent);

    // Default or calculated progress logic
    default int calculateProgress(Enrollment enrollment) {
        // Placeholder for progress calculation logic (e.g., completed lessons / total lessons * 100)
        return 0;
    }
}
