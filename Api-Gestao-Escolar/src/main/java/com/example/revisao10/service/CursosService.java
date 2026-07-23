package com.example.revisao10.service;

import com.example.revisao10.dto.CursosRequestDTO;
import com.example.revisao10.dto.CursosResponseDTO;
import com.example.revisao10.model.CursosModel;
import com.example.revisao10.repository.CursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CursosService {

    @Autowired
    private CursosRepository cursosRepository;

    public List<CursosResponseDTO> listarTodos() {
        return cursosRepository.findAll()
                .stream()
                .map(c -> new CursosResponseDTO(
                        c.getId(),
                        c.getNome(),
                        c.getCargaHoraria(),
                        c.getArea()
                )).toList();
    }

    public CursosResponseDTO buscarPorId(Long id) {
        CursosModel curso = cursosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com o ID: " + id));

        return new CursosResponseDTO(
                curso.getId(),
                curso.getNome(),
                curso.getCargaHoraria(),
                curso.getArea()
        );
    }

    public Map<String, Object> salvarCurso(CursosRequestDTO dto) {
        if (cursosRepository.findByNome(dto.getNome()).isPresent()) {
            throw new RuntimeException("Curso já cadastrado com este nome!");
        }

        CursosModel novoCurso = new CursosModel();
        novoCurso.setNome(dto.getNome());
        novoCurso.setCargaHoraria(dto.getCargaHoraria());
        novoCurso.setArea(dto.getArea());

        cursosRepository.save(novoCurso);

        return Map.of("Mensagem", "Curso cadastrado com sucesso");
    }

    public Map<String, Object> atualizar(Long id, CursosRequestDTO dto) {
        CursosModel cursoExistente = cursosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado com o ID: " + id));

        cursoExistente.setNome(dto.getNome());
        cursoExistente.setCargaHoraria(dto.getCargaHoraria());
        cursoExistente.setArea(dto.getArea());

        cursosRepository.save(cursoExistente);

        return Map.of("Mensagem", "Curso atualizado com sucesso");
    }

    public Map<String, Object> deletar(Long id) {
        if (!cursosRepository.existsById(id)) {
            throw new RuntimeException("Curso não encontrado com o ID: " + id);
        }

        cursosRepository.deleteById(id);

        return Map.of("Mensagem", "Curso apagado com sucesso");
    }
}