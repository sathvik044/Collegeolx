package com.collegeolx.collegeolx.service;

import com.collegeolx.collegeolx.model.Product;
import com.collegeolx.collegeolx.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Date;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public List<Product> getPendingProducts() {
        return productRepository.findByStatus("PENDING");
    }

    public Product approveProduct(String productId) {
        Product product = getProductById(productId);
        product.setStatus("APPROVED");
        return productRepository.save(product);
    }

    public Product rejectProduct(String productId) {
        Product product = getProductById(productId);
        product.setStatus("REJECTED");
        return productRepository.save(product);
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findByStatus("APPROVED");
    }

    public List<Product> findByStatus(String status) {
        return productRepository.findByStatus(status);
    }

    public Product createProduct(Product product, MultipartFile image) {
        try {
            // Debug log
            System.out.println("Creating product: " + product);
            
            // Validate required fields
            if (product.getTitle() == null || product.getDescription() == null || product.getPrice() == null) {
                throw new IllegalArgumentException("Title, description, and price are required");
            }
            
            // Set default values if not present
            if (product.getStatus() == null) {
                product.setStatus("PENDING");
            }
            if (product.getCreatedAt() == null) {
                product.setCreatedAt(new Date());
            }
            
            // Save to MongoDB
            Product savedProduct = productRepository.save(product);
            System.out.println("Product saved successfully: " + savedProduct);
            return savedProduct;
        } catch (Exception e) {
            System.err.println("Error in createProduct: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public Product updateProduct(String id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setTitle(product.getTitle());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}