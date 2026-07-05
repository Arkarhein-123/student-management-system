package org.jdc.portal.config;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.entity.Role;
import org.jdc.portal.entity.User;
import org.jdc.portal.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.findByRole(Role.ROLE_ADMIN).isEmpty()){
            User superAdmin = new User();
            superAdmin.setName("system_admin");
            superAdmin.setEmail("admin@jdc.edu");
            superAdmin.setPassword(passwordEncoder.encode("System123@"));
            superAdmin.setRole(Role.ROLE_ADMIN);
            superAdmin.setActive(true);
            userRepository.save(superAdmin);
            System.out.println("Super Admin created successfully");
        }
    }
}
