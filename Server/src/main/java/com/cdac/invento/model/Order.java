package com.cdac.invento.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")  // changed from default "order"
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")  // specify join column explicitly
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")  // specify join column explicitly
    private Product product;

    private int quantity;
    private double totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate = new Date();

    // Constructors, getters and setters

    public Order() {
    }

    // Getters and setters below

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}
