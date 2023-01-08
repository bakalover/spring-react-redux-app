package com.example.lab4.controllers;

import com.example.lab4.DataService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/a]" +
        "i/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/all")
    ResponseEntity<?> getALLShots(){
        return ResponseEntity.ok(userService.getAllUsernames());
    }
}
