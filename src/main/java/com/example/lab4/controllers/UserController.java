package com.example.lab4.controllers;

import com.example.lab4.DataService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/") //Начальная страница
    public String homePage(Model model){
        return "index";
    }

    //Методы обработки по указанным url...
}
