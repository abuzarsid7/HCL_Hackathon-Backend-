package com.generics.controller;

import com.generics.dto.Response.OrderResponse;
import com.generics.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class OrderController
{
    private final OrderService orderService;

    @GetMapping("/api/seller/orders")
    public ResponseEntity<List<OrderResponse>> getSellerOrders() {
        return ResponseEntity.ok(orderService.getSellerOrders());
    }

    /** GET /api/customer/orders — customer sees their past orders */
    @GetMapping("/api/customer/orders")
    public ResponseEntity<List<OrderResponse>> getCustomerOrders() {
        return ResponseEntity.ok(orderService.getCustomerOrders());
    }
}
