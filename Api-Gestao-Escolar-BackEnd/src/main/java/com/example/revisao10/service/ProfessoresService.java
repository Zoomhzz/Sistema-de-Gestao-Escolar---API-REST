package com.example.revisao10.service;

import com.example.revisao10.dto.ProfessoresRequestDTO;
import com.example.revisao10.dto.ProfessoresResponseDTO;
import com.example.revisao10.model.ProfessoresModel;
import com.example.revisao10.repository.ProfessoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProfessoresService {

    @Autowired
    private ProfessoresRepository professoresRepository;

    public List<ProfessoresResponseDTO> listarTodos() {
        return professoresRepository.findAll()
                .stream()
                .map(p -> new ProfessoresResponseDTO(
                        p.getId(),
                        p.getNome(),
                        p.getMateria(),
                        p.getSalario(),
                        p.getTurno()
                )).toList();
    }

    public ProfessoresResponseDTO buscarPorId(Long id) {
        ProfessoresModel professor = professoresRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com o ID: " + id));

        return new ProfessoresResponseDTO(
                professor.getId(),
                professor.getNome(),
                professor.getMateria(),
                professor.getSalario(),
                professor.getTurno()
        );
    }

    public Map<String, Object> salvarProfessor(ProfessoresRequestDTO dto) {
        if (professoresRepository.findByNome(dto.getNome()).isPresent()) {
            throw new RuntimeException("Professor já cadastrado com este nome!");
        }

        ProfessoresModel novoProfessor = new ProfessoresModel();
        novoProfessor.setNome(dto.getNome());
        novoProfessor.setMateria(dto.getMateria());
        novoProfessor.setSalario(dto.getSalario());
        novoProfessor.setTurno(dto.getTurno());

        professoresRepository.save(novoProfessor);

        return Map.of("Mensagem", "Professor cadastrado com sucesso");
    }

    public Map<String, Object> atualizar(Long id, ProfessoresRequestDTO dto) {
        ProfessoresModel professorExistente = professoresRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com o ID: " + id));

        professorExistente.setNome(dto.getNome());
        professorExistente.setMateria(dto.getMateria());
        professorExistente.setSalario(dto.getSalario());
        professorExistente.setTurno(dto.getTurno());

        professoresRepository.save(professorExistente);

        return Map.of("Mensagem", "Professor atualizado com sucesso");
    }

    public Map<String, Object> deletar(Long id) {
        if (!professoresRepository.existsById(id)) {
            throw new RuntimeException("Professor não encontrado com o ID: " + id);
        }

        professoresRepository.deleteById(id);

        return Map.of("Mensagem", "Professor apagado com sucesso");
    }
}