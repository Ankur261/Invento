package com.cdac.invento.service;

import com.cdac.invento.controller.ProductController.ProductRequest;
import com.cdac.invento.model.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<?> addProduct(ProductRequest productRequest);
    List<ProductDTO> getAllProducts();
    ResponseEntity<?> deleteProduct(Integer id);
    ResponseEntity<?> updateProduct(Integer id, ProductRequest updatedProduct);
}
