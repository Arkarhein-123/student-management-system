package org.jdc.portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "batches")
public class Batch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "batch_code", nullable = false, unique = true, length = 50)
    private String batchCode;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "schedule_info", nullable = false, length = 150)
    private String scheduleInfo;

    @Column(nullable = false, length = 50)
    private String format;

    @Column(name = "cohort_level", nullable = false, length = 50)
    private String cohortLevel;

    @Column(name = "max_seats",nullable = false)
    private int maxSeats;

    @Column(name = "enrolled_seats",nullable = false)
    private int enrolledSeats;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;


}