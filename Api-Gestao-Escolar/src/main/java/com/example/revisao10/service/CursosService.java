package com.example.revisao10.service;

import com.example.revisao10.dto.CursosRequestDTO;
import com.example.revisao10.dto.CursosResponseDTO;
import com.example.revisao10.model.CursosModel;
import com.example.revisao10.repository.CursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursosService {

    @Autowired
    private CursosRepository repository;

    public List<CursosResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(c -> new CursosResponseDTO(
                        c.getId(),
                        c.getNome(),
                        c.getMateria(),
                        c.getProfessor()))
                .toList();
    }

    public CursosResponseDTO salvarCurso(CursosRequestDTO dto) {
        if (repository.findByMateria(dto.getMateria()).isPresent()) {
            throw new RuntimeException("Curso já cadastrado");
        }

        CursosModel novoCurso = new CursosModel();
        novoCurso.setNome(dto.getNome());
        novoCurso.setMateria(dto.getMateria());
        novoCurso.setN_alunos(dto.getN_alunos());
        novoCurso.setProfessor(dto.getProfessor());

        repository.save(novoCurso);

        return new CursosResponseDTO(
                novoCurso.getId(),
                novoCurso.getNome(),
                novoCurso.getMateria(),
                novoCurso.getProfessor()
        );
    }
}