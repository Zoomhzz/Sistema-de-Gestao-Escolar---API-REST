package com.example.revisao10.controller;

import com.example.revisao10.dto.AlunosRequestDTO;
import com.example.revisao10.dto.AlunosResponseDTO;
import com.example.revisao10.repository.AlunosRepository;
import com.example.revisao10.service.AlunosService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/aluno")
public class AlunosController {
    @Autowired
    private AlunosService service;

    @GetMapping
    public ResponseEntity<List<AlunosResponseDTO>> listar (){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.listarTodos());
    }

    @PostMapping
    public  ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody AlunosRequestDTO dto){
        service.salvarAluno(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("Mensagem","Funcionário cadastrado com sucesso"));
    }
}
