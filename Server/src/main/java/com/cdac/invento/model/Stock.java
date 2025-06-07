package com.cdac.invento.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Stock")
public class Stock {

    @Id
    @Column(name = "ProductID")
    private Integer productId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "ProductID")
    private Product product;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    // Constructors, getters and setters
    public Stock() {}

    public Integer getProductId() {
        return productId;
    }
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
