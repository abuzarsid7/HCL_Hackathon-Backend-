package com.generics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Table
@Entity(name = "users")
@Data
public class User
{
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID user_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false , unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;
}
