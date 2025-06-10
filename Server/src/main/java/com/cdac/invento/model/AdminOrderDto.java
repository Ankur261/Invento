package com.cdac.invento.model;

import lombok.Data;

@Data
public class AdminOrderDto {
    private Long id;
    private String userName;
    private String userAddress;
    private String productName;
    private String category;
    private int quantity;
    private double totalPrice;
    private String orderDate; // formatted as "yyyy-MM-dd"
}
