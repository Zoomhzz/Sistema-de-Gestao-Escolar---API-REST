package com.example.revisao10.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "API do Sistema de Gestão Escolar está online e rodando! 🚀";
    }
}