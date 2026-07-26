package org.jdc.portal.repository;

import org.jdc.portal.entity.EnrollmentStatus;
import org.jdc.portal.entity.Payment;
import org.jdc.portal.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByEnrollmentId(Long enrollmentId);

    List<Payment> findByStatus (PaymentStatus status);

    @Query("Select p from Payment p order by p.submittedAt desc")
    List<Payment> findAllOrderBySubmittedAtDesc();
}
