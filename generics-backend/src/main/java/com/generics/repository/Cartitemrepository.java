package com.generics.repository;

import com.generics.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Cartitemrepository extends JpaRepository<CartItems, UUID>
{
}
