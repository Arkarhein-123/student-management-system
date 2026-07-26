package org.jdc.portal.dto.response;

import lombok.Builder;
import org.jdc.portal.entity.EnrollmentStatus;
import org.jdc.portal.entity.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record PaymentResponse(
        Long paymentId,
        Long enrollmentId,
        Long studentId,
        String studentName,
        Long batchId,
        String batchCode,
        String courseTitle,
        BigDecimal amount,
        String slipImageUrl,
        String remarks,
        PaymentStatus paymentStatus,
        EnrollmentStatus enrollmentStatus,
        LocalDateTime submittedAt
) {
}
