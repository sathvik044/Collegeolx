package com.collegeolx.collegeolx.controller;

import com.collegeolx.collegeolx.model.Product;
import com.collegeolx.collegeolx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            System.out.println("Debug - Total products found: " + products.size());
            System.out.println("Debug - Products: " + products);
            
            if (products.isEmpty()) {
                return ResponseEntity.ok().body("No products found");
            }
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Error fetching products: " + e.getMessage());
            e.printStackTrace(); // Add stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching products: " + e.getMessage());
        }
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableProducts() {  // Changed method name
        return ResponseEntity.ok(productService.getAvailableProducts());
    }

    // Update the available endpoint to be more specific
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getProductsByStatus(@PathVariable String status) {
        try {
            List<Product> products = productService.findByStatus(status);
            System.out.println("Fetched products with status " + status + ": " + products);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Error fetching products: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching products with status: " + status);
        }
    }

    // Add a specific endpoint for approved products
    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedProducts() {
        try {
            List<Product> products = productService.getAvailableProducts();
            System.out.println("Fetched approved products: " + products);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Error fetching approved products: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching approved products");
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            System.out.println("Received product data: " + product); // Debug log
            
            if (product.getTitle() == null || product.getDescription() == null || product.getPrice() == null) {
                return ResponseEntity.badRequest().body("Title, description, and price are required");
            }
            
            // Set default values
            product.setStatus("PENDING");
            product.setCreatedAt(new Date());
            
            Product savedProduct = productService.createProduct(product, null);
            System.out.println("Saved product: " + savedProduct); // Debug log
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            System.err.println("Error creating product: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to create product: " + e.getMessage());
        }
    }
}