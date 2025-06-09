package com.cdac.invento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cdac.invento.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}