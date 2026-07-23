package com.example.revisao10.controller;

import com.example.revisao10.dto.ProfessoresRequestDTO;
import com.example.revisao10.dto.ProfessoresResponseDTO;
import com.example.revisao10.service.ProfessoresService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/professor")
public class ProfessoresController {

    @Autowired
    private ProfessoresService service;

    @GetMapping
    public ResponseEntity<List<ProfessoresResponseDTO>> listar() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody ProfessoresRequestDTO dto) {
        service.salvarProfessor(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("Mensagem", "Professor cadastrado com sucesso"));
    }
}