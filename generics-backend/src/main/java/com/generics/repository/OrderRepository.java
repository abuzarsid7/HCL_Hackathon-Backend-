package com.generics.repository;

import com.generics.model.Order;
import com.generics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID>
{
    List<Order> findByCustomer(User customer);

    @Query("select distinct o from Order o join o.items i where i.product.seller = :seller")
    List<Order> findOrdersBySeller(User seller);
}
