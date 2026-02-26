package com.generics.dto.Response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class CartItemResponse
{
    private UUID cartItem_id;
    private UUID productId;
    private String productName;
    private Integer quantity;
    private BigDecimal priceAtTime;
    private BigDecimal subtotal;
}
