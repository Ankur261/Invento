package com.cdac.invento.service;

import com.cdac.invento.model.AdminOrderDto;
import com.cdac.invento.model.OrderDto;
import java.util.List;

public interface OrderService {
    List<OrderDto> getUserOrders(Long userId);
    List<AdminOrderDto> getAllOrders();
}
    // OrderDto createOrder(Long userId, Long productId, int quantity);
 