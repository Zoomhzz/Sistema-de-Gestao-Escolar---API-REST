package com.example.revisao10.service;

import com.example.revisao10.dto.AlunosRequestDTO;
import com.example.revisao10.dto.AlunosResponseDTO;
import com.example.revisao10.model.AlunosModel;
import com.example.revisao10.repository.AlunosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunosService {
    @Autowired
    private AlunosRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<AlunosResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(f -> new AlunosResponseDTO(
                        f.getNome(),
                        f.getMatricula(),
                        f.getTurma()))
                .toList();

    }

    public AlunosResponseDTO salvarAluno(AlunosRequestDTO dto) {
        if (repository.findByMatricula(dto.getMatricula()).isPresent()) {
            throw new RuntimeException("Aluno já cadastrado");
        }

        AlunosModel novoAluno = new AlunosModel();
        novoAluno.setNome(dto.getNome());
        novoAluno.setMatricula(dto.getMatricula());
        novoAluno.setTurma(dto.getTurma());

        String senhaCripografada = passwordEncoder.encode(dto.getMatricula());
        novoAluno.setMatricula(senhaCripografada);

        repository.save(novoAluno);

        return new AlunosResponseDTO(
                novoAluno.getNome(),
                novoAluno.getMatricula(),
                novoAluno.getTurma()
        );
    }

}