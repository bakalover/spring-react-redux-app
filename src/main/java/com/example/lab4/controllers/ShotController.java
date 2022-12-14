package com.example.lab4.controllers;

import com.example.lab4.DataService.ShotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ShotController {
    @Autowired
    private ShotService shotService;
    //Методы обработки по указанным url...
}
