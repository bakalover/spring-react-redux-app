package com.example.lab4.controllers;

import com.example.lab4.DataService.UserService;
import com.example.lab4.Entities.JwtByUsername;
import com.example.lab4.Entities.Role;
import com.example.lab4.Entities.User;
import com.example.lab4.security_jwt.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Controller
@RequestMapping("/auth")
public class RegistrationController {
    @Autowired
    Util jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    ResponseEntity<?> register(@RequestBody User userReq) {
        try {
            if (userService.loadUserByUsername(userReq.getUsername()) != null) {
                throw new Exception();
            }
            userService.add(new User(userReq.getUsername(), passwordEncoder.encode(userReq.getPassword())));
            return ResponseEntity.ok().body(userReq.getUsername());
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body("Имя пользователя '" + userReq.getUsername() + "' занято.");
        }
    }
    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody User userReq) {
        try {
            User user = (User) userService.loadUserByUsername(userReq.getUsername());
            if (user == null) {
                throw new IllegalArgumentException();
            }
            else if (!passwordEncoder.matches(userReq.getPassword(), user.getPassword())) {
                throw new IllegalAccessException();
            }
            else {
                String jwt = jwtUtil.generate(userReq.getUsername());
                return ResponseEntity.ok(new JwtByUsername(userReq.getUsername(), jwt));
            }
        }
        catch (IllegalArgumentException | IllegalAccessException exception) {
            return ResponseEntity.badRequest().body("Неверное имя пользователя или пароль.");
        }
    }
}
