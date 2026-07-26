package org.jdc.portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mapstruct.EnumMapping;
import org.w3c.dom.Text;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "slip_image_url",nullable = false)
    private String slipImageUrl;

    @Column(columnDefinition = "Text")
    private String remarks;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status;

    @Column(name = "submitted_at",nullable = false,updatable = false)
    private LocalDateTime submittedAt;

    @OneToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "enrollment_id",nullable = false)
    private Enrollment enrollment;

    @PrePersist
    protected void onCreate(){
        this.submittedAt = LocalDateTime.now();
    }

}
