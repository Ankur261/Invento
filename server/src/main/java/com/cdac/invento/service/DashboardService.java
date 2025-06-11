package com.cdac.invento.service;

import com.cdac.invento.model.DashboardDto;
import com.cdac.invento.model.DashboardDto.*;
import com.cdac.invento.model.Order;
import com.cdac.invento.model.Product;
import com.cdac.invento.repository.OrderRepository;
import com.cdac.invento.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardDto getDashboardStats() {
        DashboardDto dto = new DashboardDto();

        List<Product> allProducts = productRepository.findAll();
        List<Order> allOrders = orderRepository.findAll();

        dto.setTotalProducts(allProducts.size());

        dto.setTotalStock(allProducts.stream()
                .mapToInt(Product::getstock)
                .sum());

        dto.setOrdersToday((int) allOrders.stream()
        	    .filter(o -> o.getOrderDate().equals(LocalDate.now()))
        	    .count());


        dto.setRevenue(
        	    allOrders.stream()
        	        .map(order -> BigDecimal.valueOf(order.getTotalPrice()))  // convert Double to BigDecimal
        	        .reduce(BigDecimal.ZERO, BigDecimal::add)
        	);


        dto.setOutOfStock(allProducts.stream()
                .filter(p -> p.getstock() == 0)
                .map(p -> {
                    OutOfStockProduct out = new OutOfStockProduct();
                    out.setName(p.getName());
                    out.setCategory(p.getCategory().getName());
                    return out;
                }).collect(Collectors.toList()));

        Map<Object, Long> productSaleCount = allOrders.stream()
                .collect(Collectors.groupingBy(o -> o.getProduct().getId(), Collectors.summingLong(Order::getQuantity)));

        Optional<Entry<Object, Long>> maxEntry = productSaleCount.entrySet()
                .stream().max(Map.Entry.comparingByValue());

        if (maxEntry.isPresent()) {
            Product topProduct = productRepository.findById((Integer) maxEntry.get().getKey()).orElse(null);
            if (topProduct != null) {
                HighestSaleProduct high = new HighestSaleProduct();
                high.setName(topProduct.getName());
                high.setCategory(topProduct.getCategory().getName());
                high.setTotalUnitsSold(maxEntry.get().getValue());
                dto.setHighestSaleProduct(high);
            }
        }

        dto.setLowStock(allProducts.stream()
                .filter(p -> p.getstock() > 0 && p.getstock() <= 5)
                .map(p -> {
                    LowStockProduct low = new LowStockProduct();
                    low.setName(p.getName());
                    low.setStock(p.getstock());
                    low.setCategory(p.getCategory().getName());
                    return low;
                }).collect(Collectors.toList()));

        return dto;
    }
}
