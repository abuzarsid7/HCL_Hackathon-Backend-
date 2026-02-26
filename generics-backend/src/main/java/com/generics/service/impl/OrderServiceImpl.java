package com.generics.service.impl;

import com.generics.dto.Response.OrderItemResponse;
import com.generics.dto.Response.OrderResponse;
import com.generics.exception.InvalidDetails;
import com.generics.exception.UserNotFound;
import com.generics.model.*;
import com.generics.repository.Cartrepository;
import com.generics.repository.OrderRepository;
import com.generics.repository.Productrepository;
import com.generics.repository.UserRepo;
import com.generics.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final Cartrepository cartRepository;
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

    @Transactional
    @Override
    public OrderResponse checkout() {
        User user = currentUser();

        Cart cart = cartRepository.findByCustomer(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .customer(user)
                .status(OrderStatus.PENDING)
                .items(new ArrayList<>())
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (CartItems ci : cart.getItems()) {
            Product product = productRepository.findById(ci.getProduct().getProduct_id())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < ci.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + product.getName());
            }

            product.setStock(product.getStock() - ci.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(ci.getQuantity())
                    .price(ci.getPriceAtTime())
                    .build();

            order.getItems().add(orderItem);
            total = total.add(ci.getPriceAtTime().multiply(BigDecimal.valueOf(ci.getQuantity())));
        }

        order.setTotalAmount(total);
        orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return toResponse(order);
    }

    @Override
    public List<OrderResponse> getCustomerOrders() {
        return orderRepository.findByCustomer(currentUser())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getSellerOrders() {
        return orderRepository.findOrdersBySeller(currentUser())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private OrderResponse toResponse(Order o) {
        List<OrderItemResponse> items = o.getItems().stream().map(oi -> {
            OrderItemResponse r = new OrderItemResponse();
            r.setOrderItem_id(oi.getOrderItem_id());
            r.setProductId(oi.getProduct().getProduct_id());
            r.setProductName(oi.getProduct().getName());
            r.setQuantity(oi.getQuantity());
            r.setPrice(oi.getPrice());
            r.setSubtotal(oi.getPrice().multiply(BigDecimal.valueOf(oi.getQuantity())));
            return r;
        }).collect(Collectors.toList());

        OrderResponse r = new OrderResponse();
        r.setOrder_id(o.getOrder_id());
        r.setTotalAmount(o.getTotalAmount());
        r.setStatus(o.getStatus());
        r.setCreatedAt(o.getCreatedAt());
        r.setItems(items);
        return r;
    }
}
