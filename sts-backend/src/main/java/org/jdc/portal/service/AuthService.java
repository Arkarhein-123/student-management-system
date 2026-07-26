package org.jdc.portal.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jdc.portal.config.SecurityUser;
import org.jdc.portal.dto.response.AuthResponse;
import org.jdc.portal.dto.request.LoginRequest;
import org.jdc.portal.dto.request.RegisterRequest;
import org.jdc.portal.entity.Role;
import org.jdc.portal.entity.User;
import org.jdc.portal.mapper.AuthMapper;
import org.jdc.portal.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;
    private final JwtService jwtService;


    public AuthResponse registerStudent(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email address Already register in system database.");
        }
        if (userRepository.findByName(request.name()).isPresent()) {
            throw new RuntimeException("User name Already exist in system.");
        }
        User student = authMapper.toEntity(request);
        student.setRole(Role.ROLE_STUDENT);
        student.setActive(true);
        student.setPassword(passwordEncoder.encode(request.password()));
        User savedStudent = userRepository.save(student);
        System.out.println("Successfully Registered Student.....");
        return authMapper.toRegisterResponse(savedStudent);
    }


    public AuthResponse login(LoginRequest request){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.emailOrName(),request.password())
        );
        String token = jwtService.generateToken(authentication);

        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        User user = securityUser.getUser();
        System.out.println("Successfully Logged In with Jwt"+user.getName());

        return authMapper.toAuthResponse(user,token);
    }
}
