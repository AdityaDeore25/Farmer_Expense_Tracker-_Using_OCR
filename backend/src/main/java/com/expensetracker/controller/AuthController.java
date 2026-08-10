package com.expensetracker.controller;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allows React to talk to Java
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        // ADD THESE LOGS TO YOUR TERMINAL
        System.out.println("Login attempt for email: " + email);
        System.out.println("Password received: " + password);

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            System.out.println("User found in DB. Stored password: " + user.get().getPassword());
            if (user.get().getPassword().equals(password)) {
                return ResponseEntity.ok(user.get());
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}