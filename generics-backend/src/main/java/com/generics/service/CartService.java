package com.generics.service;

import com.generics.dto.Request.AddToCartRequest;
import com.generics.dto.Response.CartResponse;

import java.util.UUID;



public interface CartService
{
    CartResponse addToCart(AddToCartRequest request);

    // Get logged-in user's cart
    CartResponse getCart();

    // Remove item from cart
    void removeFromCart(UUID cartItemId);

}
