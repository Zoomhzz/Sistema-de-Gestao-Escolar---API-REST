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
@RequestMapping("/professores")
@CrossOrigin("*")
public class ProfessoresController {

    @Autowired
    private ProfessoresService professoresService;

    @GetMapping
    public ResponseEntity<List<ProfessoresResponseDTO>> listar() {
        return ResponseEntity.ok(professoresService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessoresResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(professoresService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody ProfessoresRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(professoresService.salvarProfessor(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @Valid @RequestBody ProfessoresRequestDTO dto) {
        return ResponseEntity.ok(professoresService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id) {
        return ResponseEntity.ok(professoresService.deletar(id));
    }
}