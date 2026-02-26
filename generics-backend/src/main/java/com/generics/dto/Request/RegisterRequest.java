package com.generics.dto.Request;

import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class RegisterRequest
{
    private String name;

    private String email;

    private String password;

    private String role;
}
