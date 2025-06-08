package com.cdac.invento.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class OrderDto {
    private Long id;
    private String productName;
    private String category;
    private int quantity;
    private double totalPrice;
    private LocalDate orderDate;
}