package com.cdac.invento.controller;



import com.cdac.invento.model.OrderRequestDTO;
import com.cdac.invento.model.Order;
import com.cdac.invento.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO requestDTO) {
        Order createdOrder = orderService.placeOrder(requestDTO);
        return ResponseEntity.ok(createdOrder);
    }
}