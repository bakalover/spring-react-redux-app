package com.example.lab4.controllers;

import com.example.lab4.DataService.UserService;
import com.example.lab4.Entities.Role;
import com.example.lab4.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Controller
//@RequestMapping("/api")
public class RegistrationController {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User()); //Зарание помещаем пустой объект, чтобы потом после заполнения формы получить его через post запрос
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(@ModelAttribute User userForm, Model model){
        userForm.setRoles(Collections.singleton(new Role(1L,"ROLE_USER"))); //Добавляем пользователю роль ROLE_USER
        userForm.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));      //Шифруем пароль
        if (!userService.add(userForm)){
            model.addAttribute("usernameError", "Пользователь с таким именем уже существует");
            return "registration";
        }
        System.out.println(userForm.getUsername());
        return "login";
    }

}
