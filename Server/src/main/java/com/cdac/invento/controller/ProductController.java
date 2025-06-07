package com.cdac.invento.controller;

import com.cdac.invento.model.CategoryTable;
import com.cdac.invento.model.Product;
import com.cdac.invento.model.ProductDTO;
import com.cdac.invento.repository.CategoryRepository;
import com.cdac.invento.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

 // DTO for product input separate DTO
    public static class ProductRequest {
        public String name;
        public String categoryName;
        public BigDecimal price;
        public int stock;
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest) {
        Optional<CategoryTable> categoryOpt = categoryRepository.findById(productRequest.categoryName);
        if (!categoryOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Category does not exist");
        }

        Product product = new Product();
        product.setName(productRequest.name);
        product.setCategory(categoryOpt.get());
        product.setPrice(productRequest.price);
        product.setstock(productRequest.stock);
        Product savedProduct = productRepository.save(product);

        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getCategory().getName(),
                        product.getPrice(),
                        product.getstock()
                ))
                .toList();
    }
}