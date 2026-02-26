package com.generics.controller;

import com.generics.dto.Request.AddToCartRequest;
import com.generics.dto.Response.CartResponse;
import com.generics.dto.Response.OrderResponse;
import com.generics.service.CartService;
import com.generics.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final OrderService orderService;


    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@Valid @RequestBody AddToCartRequest req) {
        return ResponseEntity.ok(cartService.addToCart(req));
    }


    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }


    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable UUID id) {
        cartService.removeFromCart(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout() {
        return ResponseEntity.ok(orderService.checkout());
    }
}