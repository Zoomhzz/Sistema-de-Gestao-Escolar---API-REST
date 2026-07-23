package com.example.revisao10.controller;

import com.example.revisao10.dto.CursosRequestDTO;
import com.example.revisao10.dto.CursosResponseDTO;
import com.example.revisao10.service.CursosService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cursos")
@CrossOrigin("*")
public class CursosController {

    @Autowired
    private CursosService service;

    @GetMapping
    public ResponseEntity<List<CursosResponseDTO>> listar() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody CursosRequestDTO dto) {
        service.salvarCurso(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("Mensagem", "Curso cadastrado com sucesso"));
    }
}