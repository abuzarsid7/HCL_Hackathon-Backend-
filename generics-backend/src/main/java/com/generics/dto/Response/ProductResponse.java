package com.generics.dto.Response;


import com.generics.model.Category;
import com.generics.model.PackagingType;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ProductResponse
{
    private UUID id;
    private String name;
    private BigDecimal price;
    private Category category;
    private int stock;
    private String size;
    private PackagingType packagingType;
    private UUID sellerId;
    private String sellerName;
}