package com.generics.repository;

import com.generics.model.Product;
import com.generics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface Productrepository extends JpaRepository<Product, UUID>
{
    List<Product> findBySeller(User seller);
}
