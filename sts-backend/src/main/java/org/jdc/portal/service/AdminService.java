package org.jdc.portal.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
//import org.jdc.portal.dto.request.TeacherCreateRequest;
import org.jdc.portal.dto.request.UserCreateRequest;
import org.jdc.portal.dto.request.UserStatusUpdateRequest;
import org.jdc.portal.dto.request.UserUpdateRequest;
import org.jdc.portal.dto.response.UserResponse;
import org.jdc.portal.entity.Role;
import org.jdc.portal.entity.User;
import org.jdc.portal.mapper.AuthMapper;
import org.jdc.portal.mapper.UserMapper;
import org.jdc.portal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final UserMapper userMapper;
    private final SecureRandom secureRandom = new SecureRandom();

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public List<UserResponse> getUsersByRole(Role role) {
        return userRepository.findAllByRole(role).stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Transactional
    public UserResponse createUser(@Valid UserCreateRequest request) {
        validateUniqueUser(request.name(), request.email());

        User user = userMapper.toUser(request);

        // Encode and set the password provided directly from the frontend request
        user.setPassword(passwordEncoder.encode(request.password()));

        User savedUser = userRepository.save(user);

        return userMapper.toUserResponse(savedUser);
    }

    @Transactional
    public UserResponse updateUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        user.setRole(newRole);
        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }

    @Transactional
    public UserResponse updateUserStatus(Long userId, UserStatusUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + userId));

        user.setActive(request.isActive());
        User updatedUser = userRepository.save(user);

        return userMapper.toUserResponse(updatedUser);
    }

    /**
     * Update user details (Name, Email, and optional Password reset)
     */
    @Transactional
    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + userId));

        // Validate unique email constraint against other users
        if (userRepository.existsByEmailAndIdNot(request.email(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use by another user.");
        }

        // Validate unique name constraint against other users
        if (userRepository.existsByNameAndIdNot(request.name(), userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name is already in use by another user.");
        }

        user.setName(request.name());
        user.setEmail(request.email());

        // Update password only if provided
        if (request.password() != null && !request.password().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.password().trim()));
        }

        User savedUser = userRepository.save(user);
        return userMapper.toUserResponse(savedUser);
    }

    private void validateUniqueUser(String name, String email) {
        if (userRepository.findByName(name).isPresent()) {
            throw new RuntimeException("User name is already taken");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already taken");
        }
    }
}