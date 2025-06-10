package com.cdac.invento.controller;

import com.cdac.invento.model.OrderRequestDTO;
import com.cdac.invento.model.AdminOrderDto;
import com.cdac.invento.model.Order;
import com.cdac.invento.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO requestDTO) {
        Order createdOrder = orderService.placeOrder(requestDTO);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<AdminOrderDto>> getAllOrders() {
    	
        List<AdminOrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AdminOrderDto>> viewUserOrders(@PathVariable int userId) {
    	List<AdminOrderDto> orders =orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable int orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Order not found");
        }
    }
}
