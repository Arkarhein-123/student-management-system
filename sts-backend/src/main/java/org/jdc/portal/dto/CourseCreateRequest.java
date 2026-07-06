package org.jdc.portal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

public record CourseCreateRequest(
    @NotBlank(message = "Course Name can't Be Blank")
    @Size(max = 150, message = "Course Name can't exceed 150 characters")
    String courseName,

    String description,

    @NotBlank(message = "Duration can't Be Blank")
    @Size(max = 50, message = "Duration can't exceed 50 characters")
    String duration,

    @NotNull(message = "Fees can't Be Null")
    @Positive(message = "Fees must be positive")
    BigDecimal fees
) {
}
