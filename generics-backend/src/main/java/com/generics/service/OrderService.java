package com.generics.service;

import com.generics.dto.Response.OrderResponse;

import java.util.List;

public interface OrderService
{
    OrderResponse checkout();
    List<OrderResponse> getCustomerOrders();
    List<OrderResponse> getSellerOrders();
}
