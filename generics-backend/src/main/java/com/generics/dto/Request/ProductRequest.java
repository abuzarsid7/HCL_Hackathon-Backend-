package com.generics.dto.Request;

import com.generics.model.Category;
import com.generics.model.PackagingType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest
{
    @NotBlank
    private String name;

    @NotNull
    @Min(0)
    private BigDecimal price;

    @NotNull
    private Category category;

    @NotNull @Min(0)
    private int stock;

    private String size;

    @NotNull
    private PackagingType packagingType;
}
