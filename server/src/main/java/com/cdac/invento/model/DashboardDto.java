package com.cdac.invento.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class DashboardDto {
    private int totalProducts;
    private int totalStock;
    private int ordersToday;
    private BigDecimal revenue;

    private List<OutOfStockProduct> outOfStock;
    private HighestSaleProduct highestSaleProduct;
    private List<LowStockProduct> lowStock;

    @Data
    public static class OutOfStockProduct {
        private String name;
        private String category;
    }

    @Data
    public static class HighestSaleProduct {
        private String name;
        private String category;
        private long totalUnitsSold;
    }

    @Data
    public static class LowStockProduct {
        private String name;
        private int stock;
        private String category;
    }
}
