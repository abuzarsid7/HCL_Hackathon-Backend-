package com.generics.repository;

import com.generics.model.Cart;
import com.generics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface Cartrepository extends JpaRepository<Cart, UUID>
{
    Optional<Cart> findByCustomer(User customer);
}
