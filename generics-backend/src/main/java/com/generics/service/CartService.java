package com.generics.service;

import com.generics.dto.Request.AddToCartRequest;
import com.generics.dto.Response.CartItemResponse;
import com.generics.dto.Response.CartResponse;
import com.generics.exception.InvalidDetails;
import com.generics.exception.UserNotFound;
import com.generics.model.Cart;
import com.generics.model.CartItems;
import com.generics.model.Product;
import com.generics.model.User;
import com.generics.repository.Cartitemrepository;
import com.generics.repository.Cartrepository;
import com.generics.repository.Productrepository;
import com.generics.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService
{
    private final Cartrepository cartRepository;
    private final Cartitemrepository cartItemRepository;
    private final Productrepository productRepository;
    private final UserRepo userRepository;

    private User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new InvalidDetails("Missing authentication");
        }

        final UUID userId;
        try {
            userId = UUID.fromString(authentication.getName());
        } catch (IllegalArgumentException ex) {
            throw new InvalidDetails("Invalid authenticated user id");
        }

        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound("Authenticated user not found"));
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByCustomer(user).orElseGet(() -> {
            Cart cart = Cart.builder().customer(user).build();
            return cartRepository.save(cart);
        });
    }

    @Transactional
    public CartResponse addToCart(AddToCartRequest req) {
        if (req.getQuantity() == null || req.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        User user = currentUser();
        Cart cart = getOrCreateCart(user);

        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < req.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        CartItems item = cart.getItems().stream()
                .filter(ci -> ci.getProduct().getProduct_id().equals(product.getProduct_id()))
                .findFirst()
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + req.getQuantity());
            cartItemRepository.save(item);
        } else {
            CartItems newItem = CartItems.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(req.getQuantity())
                    .priceAtTime(product.getPrice())
                    .build();
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return buildCartResponse(cart);
    }

    public CartResponse getCart() {
        Cart cart = getOrCreateCart(currentUser());
        return buildCartResponse(cart);
    }

    @Transactional
    public void removeFromCart(UUID cartItemId) {
        Cart cart = getOrCreateCart(currentUser());
        CartItems item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!item.getCart().getCart_id().equals(cart.getCart_id())) {
            throw new RuntimeException("Not your cart item");
        }
        cart.getItems().remove(item);
        cartItemRepository.delete(item);
    }

    private CartResponse buildCartResponse(Cart cart) {
        Cart fresh = cartRepository.findById(cart.getCart_id()).orElse(cart);
        List<CartItemResponse> itemResponses = fresh.getItems().stream().map(ci -> {
            CartItemResponse r = new CartItemResponse();
            r.setCartItem_id(ci.getCartItems_id());
            r.setProductId(ci.getProduct().getProduct_id());
            r.setProductName(ci.getProduct().getName());
            r.setQuantity(ci.getQuantity());
            r.setPriceAtTime(ci.getPriceAtTime());
            r.setSubtotal(ci.getPriceAtTime().multiply(BigDecimal.valueOf(ci.getQuantity())));
            return r;
        }).collect(Collectors.toList());

        BigDecimal total = itemResponses.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartResponse res = new CartResponse();
        res.setCart_id(fresh.getCart_id());
        res.setItems(itemResponses);
        res.setTotal(total);
        return res;
    }
}
