package com.generics.controller;

import com.generics.dto.Request.ProductRequest;
import com.generics.dto.Response.ProductResponse;
import com.generics.service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@AllArgsConstructor
public class ProductController
{
    private final ProductService productService;


    @PostMapping("/api/seller/products")
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest req) {
        return ResponseEntity.ok(productService.addProduct(req));
    }


    @GetMapping("/api/seller/products")
    public ResponseEntity<List<ProductResponse>> getMyProducts() {
        return ResponseEntity.ok(productService.getMyProducts());
    }

    @GetMapping("/api/products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
}
