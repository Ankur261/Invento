package com.cdac.invento.service;

import com.cdac.invento.model.AdminOrderDto;
import com.cdac.invento.model.Order;
import com.cdac.invento.model.OrderRequestDTO;

import java.util.List;

public interface OrderService {
    Order placeOrder(OrderRequestDTO requestDTO);

    List<AdminOrderDto> getAllOrders();

    List<AdminOrderDto> getOrdersByUserId(int userId);

    void cancelOrder(int orderId);
}
