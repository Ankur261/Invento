package com.cdac.invento.service;

import com.cdac.invento.model.*;
import com.cdac.invento.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final StockRepository stockRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToOrderDto)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<AdminOrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToAdminOrderDto)
                .collect(Collectors.toList());
    }

    // Add these two methods here in the service implementation
    private OrderDto convertToOrderDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        
        if(order.getProduct() != null) {
            dto.setProductName(order.getProduct().getName());
            dto.setCategory(order.getProduct().getCategory() != null 
                ? order.getProduct().getCategory().getName() 
                : "Uncategorized");
        }
        
        dto.setQuantity(order.getQuantity());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        return dto;
    }
    
    private AdminOrderDto convertToAdminOrderDto(Order order) {
        AdminOrderDto dto = new AdminOrderDto();
        dto.setId(order.getId());
        
        if(order.getProduct() != null) {
            dto.setProductName(order.getProduct().getName());
            dto.setCategory(order.getProduct().getCategory() != null 
                ? order.getProduct().getCategory().getName() 
                : "Uncategorized");
        }
        
        dto.setQuantity(order.getQuantity());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        
        if(order.getUser() != null) {
            dto.setUserName(order.getUser().getName());
            dto.setUserAddress(order.getUser().getAddress());
        }
        
        return dto;
    }
}