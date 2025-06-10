package com.cdac.invento.service;



import com.cdac.invento.model.OrderRequestDTO;
import com.cdac.invento.model.Order;

public interface OrderService {
    Order placeOrder(OrderRequestDTO requestDTO);
}