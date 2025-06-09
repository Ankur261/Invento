package com.cdac.invento.service;

import com.cdac.invento.controller.ProductController.ProductRequest;
import com.cdac.invento.model.CategoryTable;
import com.cdac.invento.model.Product;
import com.cdac.invento.model.ProductDTO;
import com.cdac.invento.repository.CategoryRepository;
import com.cdac.invento.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> addProduct(ProductRequest productRequest) {
        Optional<CategoryTable> categoryOpt = categoryRepository.findByName(productRequest.categoryName);
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

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getCategory().getName(),
                        product.getPrice(),
                        product.getstock()
                )).toList();
    }

    @Override
    public ResponseEntity<?> deleteProduct(Integer id) {
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isPresent()) {
            productRepository.deleteById(id);
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> updateProduct(Integer id, ProductRequest updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (!existingProductOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<CategoryTable> categoryOpt = categoryRepository.findByName(updatedProduct.categoryName);
        if (!categoryOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Category does not exist");
        }

        Product existingProduct = existingProductOpt.get();
        existingProduct.setName(updatedProduct.name);
        existingProduct.setPrice(updatedProduct.price);
        existingProduct.setstock(updatedProduct.stock);
        existingProduct.setCategory(categoryOpt.get());

        productRepository.save(existingProduct);

        return ResponseEntity.ok("Product updated successfully");
    }
}
