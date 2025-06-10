package com.cdac.invento.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AdminOrderDto(
	    Long id,
	    String productName,
	    String category,
	    int quantity,
	    BigDecimal totalPrice,
	    LocalDate orderDate,
	    String userName,
	    String userAddress,
	    String status
	) {}