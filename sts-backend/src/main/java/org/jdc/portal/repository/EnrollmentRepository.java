package org.jdc.portal.repository;

import org.jdc.portal.entity.Enrollment;
import org.jdc.portal.entity.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    Optional<Enrollment> findByStudentIdAndBatchId(Long studentId, Long batchId);

    List<Enrollment> findByStudentId(Long studentId);

    @Query("select e from Enrollment e where e.batch.id = :batchId")
    List<Enrollment> findByBatchId(Long batchId);

    Optional<Enrollment> findByStudentIdAndEnrollmentStatus(Long studentId, EnrollmentStatus enrollmentStatus);
}
