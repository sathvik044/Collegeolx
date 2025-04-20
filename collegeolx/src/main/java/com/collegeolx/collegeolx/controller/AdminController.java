package com.collegeolx.collegeolx.controller;

import com.collegeolx.collegeolx.model.User;
import com.collegeolx.collegeolx.model.Product;
import com.collegeolx.collegeolx.service.UserService;
import com.collegeolx.collegeolx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;  // Add this import
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private static final String ADMIN_EMAIL = "sath123@gmail.com";
    private static final String ADMIN_PASSWORD = "123";

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody User user) {
        try {
            // Debug logging
            System.out.println("Attempting admin login for: " + user.getEmail());
            
            // Validate input
            if (user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest()
                    .body("Email and password are required");
            }

            // Check if credentials match the fixed admin credentials
            if (ADMIN_EMAIL.equals(user.getEmail()) && ADMIN_PASSWORD.equals(user.getPassword())) {
                User adminUser = new User();
                adminUser.setId("1");
                adminUser.setEmail(ADMIN_EMAIL);
                adminUser.setName("Admin");
                adminUser.setRole("ADMIN");
                
                System.out.println("Admin login successful");
                return ResponseEntity.ok()
                    .body(adminUser);
            }
            
            System.out.println("Invalid admin credentials attempted");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid admin credentials");
        } catch (Exception e) {
            System.out.println("Admin login error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Admin login failed: " + e.getMessage());
        }
    }

    // Other endpoints will only work after successful admin login
    @GetMapping("/products/pending")
    public ResponseEntity<?> getPendingProducts() {
        return ResponseEntity.ok(productService.getPendingProducts());
    }

    @PostMapping("/products/{productId}/approve")
    public ResponseEntity<?> approveProduct(@PathVariable String productId) {
        try {
            Product approvedProduct = productService.approveProduct(productId);
            return ResponseEntity.ok(approvedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to approve product: " + e.getMessage());
        }
    }

    @PostMapping("/products/{productId}/reject")
    public ResponseEntity<?> rejectProduct(@PathVariable String productId) {
        try {
            Product rejectedProduct = productService.rejectProduct(productId);
            return ResponseEntity.ok(rejectedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to reject product: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(userService.getDashboardStats());
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) { // Changed from Long to String
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}