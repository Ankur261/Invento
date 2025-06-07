package com.cdac.invento.model;

import java.math.BigDecimal;

public class ProductDTO {
    private Integer id;
    private String name;
    private String category;
    private BigDecimal price;
    private int stock;

    public ProductDTO(Integer id, String name, String category, BigDecimal price, int stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
}