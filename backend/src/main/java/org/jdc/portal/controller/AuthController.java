package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.AuthResponse;
import org.jdc.portal.dto.LoginRequest;
import org.jdc.portal.dto.RegisterRequest;
import org.jdc.portal.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStudent(@Valid @RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerStuent(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginStudent(@Valid @RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginStudent(request));
    }
}
