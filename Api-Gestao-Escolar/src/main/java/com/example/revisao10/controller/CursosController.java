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
    private CursosService cursosService;

    @GetMapping
    public ResponseEntity<List<CursosResponseDTO>> listar() {
        return ResponseEntity.ok(cursosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursosResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cursosService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody CursosRequestDTO dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cursosService.salvarCurso(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(@PathVariable Long id, @Valid @RequestBody CursosRequestDTO dto) {
        return ResponseEntity.ok(cursosService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id) {
        return ResponseEntity.ok(cursosService.deletar(id));
    }
}