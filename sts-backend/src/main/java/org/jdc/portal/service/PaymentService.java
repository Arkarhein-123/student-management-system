package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.PaymentStatusUpdateRequest;
import org.jdc.portal.dto.request.PaymentSubmitRequest;
import org.jdc.portal.dto.response.PaymentResponse;
import org.jdc.portal.entity.*;
import org.jdc.portal.mapper.PaymentMapper;
import org.jdc.portal.repository.BatchRepository;
import org.jdc.portal.repository.EnrollmentRepository;
import org.jdc.portal.repository.PaymentRepository;
import org.jdc.portal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final PaymentMapper paymentMapper;

    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {
        List<Payment> payments = paymentRepository.findAllOrderBySubmittedAtDesc();
        return payments.stream()
                .map(paymentMapper::toPaymentResponse)
                .toList();
    }

    @Transactional
    public PaymentResponse updatePaymentStatus(Long paymentId, PaymentStatusUpdateRequest request) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        PaymentStatus oldStatus = payment.getStatus();
        PaymentStatus newStatus = request.status();

        // Early return if no change
        if (oldStatus == newStatus) {
            return paymentMapper.toPaymentResponse(payment);
        }

        // Update payment status
        payment.setStatus(newStatus);

        // Sync Enrollment & Batch Seats safely
        Enrollment enrollment = payment.getEnrollment();
        if (enrollment != null) {

            // Sync enrollment status with payment status
            switch (newStatus) {
                case APPROVED -> enrollment.setEnrollmentStatus(EnrollmentStatus.APPROVED);
                case DROPPED -> enrollment.setEnrollmentStatus(EnrollmentStatus.DROPPED);
                case PENDING -> enrollment.setEnrollmentStatus(EnrollmentStatus.PENDING);
            }

            // Handle seat count changes on Batch (Safely nested inside enrollment check)
            Batch batch = enrollment.getBatch();
            if (batch != null) {

                //  Transitioning TO Approved from anything else -> Add Seat
                if (newStatus == PaymentStatus.APPROVED && oldStatus != PaymentStatus.APPROVED) {
                    if (batch.getEnrolledSeats() >= batch.getMaxSeats()) {
                        throw new IllegalStateException("Batch is full");
                    }
                    batch.setEnrolledSeats(batch.getEnrolledSeats() + 1);
                }
                //  Transitioning AWAY FROM Approved to anything else -> Release Seat
                else if (oldStatus == PaymentStatus.APPROVED && newStatus != PaymentStatus.APPROVED) {
                    int currentSeats = batch.getEnrolledSeats();
                    batch.setEnrolledSeats(Math.max(0, currentSeats - 1));
                }
            }
        }

        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    @Transactional
    public PaymentResponse submitPayment(PaymentSubmitRequest request, Long studentId) {
        Batch batch = batchRepository.findById(request.batchId())
                .orElseThrow(() -> new IllegalArgumentException("Batch not found"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        Enrollment enrollment = enrollmentRepository.findByStudentIdAndBatchId(studentId, batch.getId())
                .orElseGet(() -> {
                    Enrollment newEnrollment = new Enrollment();
                    newEnrollment.setStudent(student);
                    newEnrollment.setBatch(batch);
                    newEnrollment.setEnrollmentStatus(EnrollmentStatus.PENDING);
                    return enrollmentRepository.save(newEnrollment);
                });

        // Prevent resubmission only if already approved
        if (enrollment.getEnrollmentStatus() == EnrollmentStatus.APPROVED) {
            throw new IllegalStateException("Student is already approved for this batch.");
        }

        // If previously dropped, reset enrollment back to PENDING so admin can review the new submission
        if (enrollment.getEnrollmentStatus() == EnrollmentStatus.DROPPED) {
            enrollment.setEnrollmentStatus(EnrollmentStatus.PENDING);
        }

        Payment payment = paymentRepository.findByEnrollmentId(enrollment.getId())
                .map(existingPayment -> {
                    existingPayment.setSlipImageUrl(request.slipImageUrl());
                    existingPayment.setRemarks(request.remarks());
                    existingPayment.setStatus(PaymentStatus.PENDING); // Reset payment status to PENDING for re-review
                    return existingPayment;
                })
                .orElseGet(() -> {
                    Payment newPayment = paymentMapper.toPayment(request);
                    newPayment.setEnrollment(enrollment);
                    newPayment.setAmount(batch.getCourse().getFees());
                    newPayment.setStatus(PaymentStatus.PENDING);
                    // @PrePersist handles submittedAt automatically!
                    return newPayment;
                });

        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByEnrollmentId(Long enrollmentId) {
        Payment payment = paymentRepository.findByEnrollmentId(enrollmentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        return paymentMapper.toPaymentResponse(payment);
    }
}