package com.cdac.invento.service;

import com.cdac.invento.model.OrderRequestDTO;
import com.cdac.invento.model.Order;
import com.cdac.invento.model.Product;
import com.cdac.invento.model.User;
import com.cdac.invento.repository.OrderRepository;
import com.cdac.invento.repository.ProductRepository;
import com.cdac.invento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Override
    public Order placeOrder(OrderRequestDTO dto) {
        User user = userRepo.findById((long) dto.getUserId())
                            .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById((long) dto.getProductId())
                                     .orElseThrow(() -> new RuntimeException("Product not found"));

        // Validate totalPrice from client matches product price * quantity
        BigDecimal expectedPrice = product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity()));
        if (dto.getTotalPrice() == null || dto.getTotalPrice().compareTo(expectedPrice) != 0) {
            throw new RuntimeException("Total price mismatch");
        }

        Order order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setQuantity(dto.getQuantity());
        // Convert BigDecimal to double for the entity setter
        order.setTotalPrice(dto.getTotalPrice().doubleValue());
        order.setOrderDate(dto.getOrderDate() != null ? dto.getOrderDate() : new Date());

        return orderRepo.save(order);
    }
}