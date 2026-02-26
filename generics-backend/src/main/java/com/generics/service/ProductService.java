package com.generics.service;

import com.generics.dto.Request.ProductRequest;
import com.generics.dto.Response.ProductResponse;
import jakarta.validation.Valid;

import java.util.List;


public interface ProductService
{
    ProductResponse addProduct(@Valid ProductRequest req);
    List<ProductResponse> getMyProducts();
    List<ProductResponse> getAllProducts();
}
