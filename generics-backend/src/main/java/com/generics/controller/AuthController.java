package com.generics.controller;

import com.generics.dto.Request.LoginRequest;
import com.generics.dto.Request.RegisterRequest;
import com.generics.dto.Response.AuthResponse;
import com.generics.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController
{
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> userLogin(@Valid @RequestBody LoginRequest request)
    {
        AuthResponse response = authService.loginUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<AuthResponse> userCreate(@Valid @RequestBody RegisterRequest request)
    {
        AuthResponse response = authService.createUser(request);
        return ResponseEntity.ok(response);
    }
}
