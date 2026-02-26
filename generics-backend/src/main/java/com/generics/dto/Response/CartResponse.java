package com.generics.dto.Response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CartResponse
{
    private UUID cart_id;
    private List<CartItemResponse> items;
    private BigDecimal total;
}
