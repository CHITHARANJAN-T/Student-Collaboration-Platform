package com.teamconnect.teamconnect.service.impl;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamconnect.teamconnect.dto.request.AuthenticationRequest;
import com.teamconnect.teamconnect.dto.request.RegisterRequest;
import com.teamconnect.teamconnect.dto.response.AuthenticationResponse;
import com.teamconnect.teamconnect.model.User;
import com.teamconnect.teamconnect.model.enumerate.Role;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.AuthService;
import com.teamconnect.teamconnect.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public boolean userRegistration(RegisterRequest request) {
        Optional<User> isUserEmailExists = userRepository.findByEmail(request.getEmail());
        Optional<User> isUserNameExists = userRepository.findByName(request.getName());
        if (!isUserEmailExists.isPresent() && !isUserNameExists.isPresent()) {
            var user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .isEnabled(true)
                    .role(Role.valueOf(request.getRole().toUpperCase()))
                    .build();
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public AuthenticationResponse userAuthentication(AuthenticationRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            
        } catch (Exception e) {
            return AuthenticationResponse.builder()
                .token(null)
                .name(null)
                .build();
        }
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            var token = jwtUtil.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(token)
                    .name(user.getName())
                    .build();
            
        
    }

    @Override
    public AuthenticationResponse adminAuthentication(AuthenticationRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            
        } catch (Exception e) {
            return AuthenticationResponse.builder()
                .token(null)
                .name(null)
                .build();
        }
            var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            Role role = user.getRole();
            Role admin = Role.ADMIN;
            System.out.println(role.equals(role));

            if(role.equals(admin)){
                var token = jwtUtil.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(token)
                    .name("ADMIN")
                    .build();
            }
            return AuthenticationResponse.builder()
                .token(null)
                .name(null)
                .build();
            
        
    }
}
