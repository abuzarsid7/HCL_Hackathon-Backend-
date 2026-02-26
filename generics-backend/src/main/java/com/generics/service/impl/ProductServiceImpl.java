package com.generics.service.impl;

import com.generics.dto.Request.ProductRequest;
import com.generics.dto.Response.ProductResponse;
import com.generics.exception.InvalidDetails;
import com.generics.exception.UserNotFound;
import com.generics.model.Product;
import com.generics.model.User;
import com.generics.repository.Productrepository;
import com.generics.repository.UserRepo;
import com.generics.service.ProductService;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

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

    @Override
    public ProductResponse addNewProduct(ProductRequest req) {
        User seller = currentUser();
        Product product = Product.builder()
                .name(req.getName())
                .price(req.getPrice())
                .category(req.getCategory())
                .stock(req.getStock())
                .size(req.getSize())
                .packagingType(req.getPackagingType())
                .seller(seller)
                .build();
        return toResponse(productRepository.save(product));
    }

    @Override
    public List<ProductResponse> getProductsBySeller() {
        return productRepository.findBySeller(currentUser())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> fetchAllProducts() {
        return productRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product p) {
        ProductResponse r = new ProductResponse();
        r.setId(p.getProduct_id());
        r.setName(p.getName());
        r.setPrice(p.getPrice());
        r.setCategory(p.getCategory());
        r.setStock((int) p.getStock());
        r.setSize(p.getSize());
        r.setPackagingType(p.getPackagingType());
        r.setSellerId(p.getSeller().getUser_id());  // fixed
        r.setSellerName(p.getSeller().getName());
        return r;
    }
}
