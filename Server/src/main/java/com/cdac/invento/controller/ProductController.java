// package com.cdac.invento.controller;

// import com.cdac.invento.model.Category;
// import com.cdac.invento.model.Product;
// import com.cdac.invento.model.ProductDTO;
// import com.cdac.invento.repository.CategoryRepository;
// import com.cdac.invento.repository.ProductRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.math.BigDecimal;
// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/products")
// @CrossOrigin(origins = "http://localhost:5173") 
// public class ProductController {

//     @Autowired
//     private ProductRepository productRepository;

//     @Autowired
//     private CategoryRepository categoryRepository;

//  // DTO for product input separate DTO
//     public static class ProductRequest {
//         public String name;
//         public String categoryName;
//         public BigDecimal price;
//         public int stock;
//     }

//     @PostMapping
//     public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest) {
//         Optional<Category> categoryOpt = categoryRepository.findById(productRequest.categoryName);
//         if (!categoryOpt.isPresent()) {
//             return ResponseEntity.badRequest().body("Category does not exist");
//         }

//         Product product = new Product();
//         product.setName(productRequest.name);
//         product.setCategory(categoryOpt.get());
//         product.setPrice(productRequest.price);
//         product.setstock(productRequest.stock);
//         Product savedProduct = productRepository.save(product);

//         return ResponseEntity.ok(savedProduct);
//     }

//     @GetMapping
//     public List<ProductDTO> getAllProducts() {
//         List<Product> products = productRepository.findAll();

//         return products.stream()
//                 .map(product -> new ProductDTO(
//                         product.getId(),
//                         product.getName(),
//                         product.getCategory().getName(),
//                         product.getPrice(),
//                         product.getstock()
//                 ))
//                 .toList();
//     }
    
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
//         Optional<Product> productOpt = productRepository.findById(id);
//         if (productOpt.isPresent()) {
//             productRepository.deleteById(id);
//             return ResponseEntity.ok("Product deleted successfully");
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }
    
//     @PutMapping("/products/{id}")
//     public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
//         Optional<Product> existingProductOpt = productRepository.findById(id);
//         if (existingProductOpt.isPresent()) {
//             Product existingProduct = existingProductOpt.get();

//             existingProduct.setName(updatedProduct.getName());
//             existingProduct.setPrice(updatedProduct.getPrice());
//             existingProduct.setstock(updatedProduct.getstock());
//             existingProduct.setCategory(updatedProduct.getCategory());

//             productRepository.save(existingProduct);
//             return ResponseEntity.ok("Product updated successfully");
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }

// }