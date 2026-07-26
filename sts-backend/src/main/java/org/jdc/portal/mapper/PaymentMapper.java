package org.jdc.portal.mapper;

import org.jdc.portal.dto.request.PaymentSubmitRequest;
import org.jdc.portal.dto.response.PaymentResponse;
import org.jdc.portal.entity.Enrollment;
import org.jdc.portal.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {
    @Mapping(source = "id",target = "paymentId")
    @Mapping(source = "enrollment.id",target = "enrollmentId")
    @Mapping(source = "enrollment.student.id",target = "studentId")
    @Mapping(source = "enrollment.student.name",target = "studentName")
    @Mapping(source = "enrollment.batch.id",target = "batchId")
    @Mapping(source = "enrollment.batch.batchCode",target = "batchCode")
    @Mapping(source = "enrollment.batch.course.courseName",target = "courseTitle")
    @Mapping(source = "slipImageUrl",target = "slipImageUrl")
    @Mapping(source = "remarks",target = "remarks")
    @Mapping(source = "status",target = "paymentStatus")
    @Mapping(source = "enrollment.enrollmentStatus",target = "enrollmentStatus")
    @Mapping(source = "submittedAt",target = "submittedAt")
    PaymentResponse toPaymentResponse(Payment payment);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enrollment", ignore = true)
    @Mapping(target = "amount", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "submittedAt", ignore = true)
    Payment toPayment(PaymentSubmitRequest request);
}
