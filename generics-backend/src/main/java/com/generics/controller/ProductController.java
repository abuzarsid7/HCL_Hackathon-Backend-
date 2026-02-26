package com.generics.controller;

import com.generics.dto.Request.ProductRequest;
import com.generics.dto.Response.ProductResponse;
import com.generics.service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/api/seller")

public class ProductController
{
    private final ProductService productService;


    @PostMapping("/products")
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest req) {
        return ResponseEntity.ok(productService.addNewProduct(req));
    }


    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getMyProducts() {
        return ResponseEntity.ok(productService.getProductsBySeller());
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.fetchAllProducts());
    }
}
