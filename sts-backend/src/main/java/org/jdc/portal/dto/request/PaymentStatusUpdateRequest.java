package org.jdc.portal.dto.request;

import jakarta.validation.constraints.NotNull;
import org.jdc.portal.entity.PaymentStatus;

public record PaymentStatusUpdateRequest(
        @NotNull(message = "Status is required")
        PaymentStatus status
) {}
