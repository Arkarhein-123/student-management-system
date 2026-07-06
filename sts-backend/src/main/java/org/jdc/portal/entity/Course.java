package org.jdc.portal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_name",nullable = false,length = 150)
    private String courseName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration",nullable = false,length = 50)
    private String duration;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal fees;
}
