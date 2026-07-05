package org.jdc.portal.service;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.config.SecurityUser;
import org.jdc.portal.dto.AuthResponse;
import org.jdc.portal.dto.LoginRequest;
import org.jdc.portal.dto.RegisterRequest;
import org.jdc.portal.entity.Role;
import org.jdc.portal.entity.User;
import org.jdc.portal.mapper.AuthMapper;
import org.jdc.portal.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;

    public AuthResponse registerStuent(RegisterRequest request){
        if(userRepository.findByEmail(request.email()).isPresent()){
            throw new RuntimeException("Email address Already register in system database.");
        }
        if(userRepository.findByName(request.name()).isPresent()){
            throw new RuntimeException("User name Already exist in system.");
        }
        User student = authMapper.toEntity(request);
        student.setRole(Role.ROLE_STUDENT);
        student.setActive(true);
        student.setPassword(passwordEncoder.encode(request.password()));
        User savedStudent = userRepository.save(student);
        System.out.println("Successfully Registered Student.....");
        return authMapper.toAuthResponse(savedStudent);
    }

    public AuthResponse loginStudent(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.emailOrName(),request.password())
        );
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        User user = securityUser.getUser();
        System.out.println("Successfully Logged In Student.....");
        return authMapper.toAuthResponse(user);
    }
}
