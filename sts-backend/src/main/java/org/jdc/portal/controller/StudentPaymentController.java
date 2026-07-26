package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.PaymentSubmitRequest;
import org.jdc.portal.dto.response.PaymentResponse;
import org.jdc.portal.repository.PaymentRepository;
import org.jdc.portal.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/student/payments")
@RequiredArgsConstructor
public class StudentPaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> submitPayment(
            @Valid @RequestBody PaymentSubmitRequest request,
            @AuthenticationPrincipal Jwt jwt
            ){
        Number userIdClaim = jwt.getClaim("userId");
        Long studentId = userIdClaim != null ? userIdClaim.longValue() : null;

        PaymentResponse paymentResponse = paymentService.submitPayment(request,studentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentResponse);
    }


    @GetMapping("/enrollment/{enrollmentId}")
    public ResponseEntity<PaymentResponse> getPaymentByEnrollmentId(@PathVariable Long enrollmentId){
        PaymentResponse paymentResponse = paymentService.getPaymentByEnrollmentId(enrollmentId);
        return ResponseEntity.ok(paymentResponse);
    }
}