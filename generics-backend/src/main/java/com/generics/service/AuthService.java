package com.generics.service;

import com.generics.dto.Request.LoginRequest;
import com.generics.dto.Request.RegisterRequest;
import com.generics.dto.Response.AuthResponse;
import com.generics.exception.EmailAlreadyExits;

public interface AuthService
{
    AuthResponse createUser(RegisterRequest request) throws EmailAlreadyExits;
    AuthResponse loginUser(LoginRequest request);
}
