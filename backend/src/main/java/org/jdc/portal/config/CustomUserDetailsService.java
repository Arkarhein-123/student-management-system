package org.jdc.portal.config;

import lombok.RequiredArgsConstructor;
import org.jdc.portal.entity.User;
import org.jdc.portal.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String inputData) throws UsernameNotFoundException {
        User user = userRepository.findByNameOrEmail(inputData,inputData)
                .orElseThrow(() -> new UsernameNotFoundException("User Name Not Found!"));
        return new SecurityUser(user);
    }
}
