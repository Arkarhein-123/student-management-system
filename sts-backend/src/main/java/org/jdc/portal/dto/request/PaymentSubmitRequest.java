package org.jdc.portal.dto.request;

import jakarta.validation.constraints.NotBlank;

public record PaymentSubmitRequest(
        Long batchId,
        String remarks,
        @NotBlank(message = "Slip image file is required")
        String slipImageUrl
) {}
