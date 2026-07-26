package org.jdc.portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.dto.request.*;
import org.jdc.portal.dto.response.UserResponse;
import org.jdc.portal.entity.Role;
import org.jdc.portal.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    // GET /api/v1/admin/users
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // GET /api/v1/admin/users/{role}
    @GetMapping("/users/{role}")
    public ResponseEntity<List<UserResponse>> getAllUsersByRole(@PathVariable Role role) {
        List<UserResponse> users = adminService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    // POST /api/v1/admin/users/create
    @PostMapping("/users/create")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        UserResponse user = adminService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    // PUT /api/v1/admin/users/{userId}/role
    @PutMapping("/users/{userId}/role")
    public ResponseEntity<UserResponse> updateUserRole(
            @PathVariable Long userId,
            @Valid @RequestBody UserRoleUpdateRequest request) {
        UserResponse updatedUser = adminService.updateUserRole(userId, request.role());
        return ResponseEntity.ok(updatedUser);
    }

    // PATCH /api/v1/admin/users/{id}/status  ◄ Added /users
    @PatchMapping("/users/{id}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable Long id,
            @Valid @RequestBody UserStatusUpdateRequest request
    ) {
        UserResponse response = adminService.updateUserStatus(id, request);
        return ResponseEntity.ok(response);
    }

    // PUT /api/v1/admin/users/{id}          ◄ Added /users
    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request
    ) {
        UserResponse response = adminService.updateUser(id, request);
        return ResponseEntity.ok(response);
    }
}