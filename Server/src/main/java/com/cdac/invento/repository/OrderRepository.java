package com.cdac.invento.repository;

import com.cdac.invento.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Option 1: Using query derivation (recommended)
    List<Order> findByUser_Id(Long userId);
    
    // OR Option 2: Using explicit JPQL query
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> findByUserId(@Param("userId") int userId);
}