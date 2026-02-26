package com.generics.service.impl;

import com.generics.dto.Request.LoginRequest;
import com.generics.dto.Request.RegisterRequest;
import com.generics.dto.Response.AuthResponse;
import com.generics.exception.EmailAlreadyExits;
import com.generics.exception.InvalidDetails;
import com.generics.exception.UserNotFound;
import com.generics.model.User;
import com.generics.repository.UserRepo;
import com.generics.security.JwtUtil;
import com.generics.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService
{
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse createUser(RegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail()))
        {
            throw new EmailAlreadyExits("Email Already Exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(
                request.getRole() != null
                        ? request.getRole().toUpperCase()
                        : "CUSTOMER"
        );

        User savedUser = userRepo.save(user);
        String token = jwtUtil.generateToken(savedUser.getUser_id(),savedUser.getRole());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        return response;


    }

    @Override
    public AuthResponse loginUser(LoginRequest request)
    {
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow(()-> new UserNotFound("User Not Found"));

        if(!passwordEncoder.matches(request.getPassword(),user.getPassword()))
        {
            throw new InvalidDetails("Invalid credentials");
        }

        AuthResponse response = new AuthResponse();
        String token = jwtUtil.generateToken(user.getUser_id(),user.getRole());
        response.setToken(token);
        return response;

    }
}
