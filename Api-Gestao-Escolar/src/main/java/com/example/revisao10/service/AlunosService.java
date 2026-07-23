package com.example.revisao10.service;

import com.example.revisao10.dto.AlunosRequestDTO;
import com.example.revisao10.dto.AlunosResponseDTO;
import com.example.revisao10.model.AlunosModel;
import com.example.revisao10.repository.AlunosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlunosService {

    @Autowired
    private AlunosRepository repository;



    public List<AlunosResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(f -> new AlunosResponseDTO(
                        f.getId(),
                        f.getNome(),
                        f.getMatricula(),
                        f.getTurno()))
                .toList();
    }

    public AlunosResponseDTO salvarAluno(AlunosRequestDTO dto) {

        if (repository.findByMatricula(dto.getMatricula()).isPresent()) {
            throw new RuntimeException("Aluno já cadastrado com esta matrícula!");
        }

        AlunosModel novoAluno = new AlunosModel();
        novoAluno.setNome(dto.getNome());
        novoAluno.setMatricula(dto.getMatricula());
        novoAluno.setTurma(dto.getTurma());
        novoAluno.setTurno(dto.getTurno());

        repository.save(novoAluno);

        return new AlunosResponseDTO(
                novoAluno.getId(),
                novoAluno.getNome(),
                novoAluno.getMatricula(),
                novoAluno.getTurno()
        );
    }

    public AlunosResponseDTO buscarPorId(Long id) {
        AlunosModel aluno = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com o ID: " + id));

        return new AlunosResponseDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getMatricula(),
                aluno.getTurno()
        );
    }

    public Map<String, Object> deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Aluno não encontrado com o ID: " + id);
        }
        repository.deleteById(id);
        return Map.of("Mensagem", "Aluno apagado com sucesso");
    }

    public Map<String, Object> atualizar(Long id, AlunosRequestDTO dto) {
        AlunosModel alunoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com o ID: " + id));

        // Atualiza os campos do aluno
        alunoExistente.setNome(dto.getNome());
        alunoExistente.setMatricula(dto.getMatricula());
        alunoExistente.setTurma(dto.getTurma());
        alunoExistente.setTurno(dto.getTurno());

        repository.save(alunoExistente);

        return Map.of("Mensagem", "Aluno atualizado com sucesso");
    }
}