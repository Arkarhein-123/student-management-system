package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.PaymentStatusUpdateRequest;
import org.jdc.portal.dto.response.PaymentResponse;
import org.jdc.portal.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/payments")
public class AdminPaymentController {
    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<PaymentResponse>> findAllOrderBySubmittedAtDesc() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PutMapping("/{paymentId}/status")
    public ResponseEntity<PaymentResponse> updatePaymentStatus(
            @PathVariable Long paymentId,
            @Valid @RequestBody PaymentStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(paymentId, request));
    }


}
