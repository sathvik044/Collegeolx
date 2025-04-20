package com.collegeolx.collegeolx.controller;

import com.collegeolx.collegeolx.model.User;
import com.collegeolx.collegeolx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")  // Changed from "/api/users"
@CrossOrigin(origins = "http://localhost:3000") // Add CORS support
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Validate admin registration
            if ("ADMIN".equals(user.getRole())) {
                String adminCode = user.getAdminCode();
                // Using a more secure admin code
                if (adminCode == null || !adminCode.equals("ADMIN123")) { // Use this admin code: ADMIN123
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid admin registration code");
                }
            }

            // Set default role if not specified
            if (user.getRole() == null) {
                user.setRole("STUDENT");
            }

            // Additional validation for admin registration
            if ("ADMIN".equals(user.getRole())) {
                // Check if admin already exists
                if (userService.isAdminExists()) {
                    return ResponseEntity.badRequest().body("Admin already exists");
                }
            }

            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }
            
            // Find user and verify password
            User existingUser = userService.findByEmail(user.getEmail());
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
            }
            
            // Verify password
            if (!existingUser.getPassword().equals(user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
            }
            
            // Don't send password in response
            existingUser.setPassword(null);
            return ResponseEntity.ok(existingUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Login failed: " + e.getMessage());
        }
    }
}