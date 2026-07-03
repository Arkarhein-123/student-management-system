package org.jdc.portal.repository;

import org.jdc.portal.entity.Enrollment;
import org.jdc.portal.entity.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByBatchId(Long batchId);
    List<Enrollment> findByEnrollmentStatus(EnrollmentStatus enrollmentStatus);


}
