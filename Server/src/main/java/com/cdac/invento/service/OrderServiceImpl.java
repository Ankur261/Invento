package com.cdac.invento.service;

import com.cdac.invento.model.AdminOrderDto;
import com.cdac.invento.model.Order;
import com.cdac.invento.model.OrderRequestDTO;
import com.cdac.invento.model.Product;
import com.cdac.invento.model.User;
import com.cdac.invento.repository.OrderRepository;
import com.cdac.invento.repository.ProductRepository;
import com.cdac.invento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

        BigDecimal expectedPrice = product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity()));
        if (dto.getTotalPrice() == null || dto.getTotalPrice().compareTo(expectedPrice) != 0) {
            throw new RuntimeException("Total price mismatch");
        }

        Order order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setQuantity(dto.getQuantity());
        order.setTotalPrice(dto.getTotalPrice().doubleValue());
        order.setOrderDate(dto.getOrderDate() != null ? dto.getOrderDate() : new Date());

        return orderRepo.save(order);
    }

    @Override
    public List<AdminOrderDto> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(this::convertToAdminOrderDto)
                .collect(Collectors.toList());
    }

    private AdminOrderDto convertToAdminOrderDto(Order order) {
        AdminOrderDto dto = new AdminOrderDto();
        dto.setId(order.getId());

        if (order.getUser() != null) {
            dto.setUserName(order.getUser().getName());
            dto.setUserAddress(order.getUser().getAddress());
        }

        if (order.getProduct() != null) {
            dto.setProductName(order.getProduct().getName());
            dto.setCategory(order.getProduct().getCategory() != null
                    ? order.getProduct().getCategory().getName()
                    : "Uncategorized");
        }

        dto.setQuantity(order.getQuantity());
        dto.setTotalPrice(order.getTotalPrice());

        if (order.getOrderDate() != null) {
            dto.setOrderDate(order.getOrderDate().toString()); // already yyyy-MM-dd
        }


        return dto;
    }

    @Override
    public List<AdminOrderDto> getOrdersByUserId(int userId) {
        return orderRepo.findByUserId(userId).stream()
                .map(this::convertToAdminOrderDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelOrder(int orderId) {
        if (!orderRepo.existsById((long) orderId)) {
            throw new RuntimeException("Order not found");
        }
        orderRepo.deleteById((long) orderId);
    }
}
