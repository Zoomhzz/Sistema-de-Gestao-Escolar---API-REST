package com.example.revisao10.service;

import com.example.revisao10.dto.ProfessoresRequestDTO;
import com.example.revisao10.dto.ProfessoresResponseDTO;
import com.example.revisao10.model.ProfessoresModel;
import com.example.revisao10.repository.ProfessoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessoresService {

    @Autowired
    private ProfessoresRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<ProfessoresResponseDTO> listarTodos() {
        return repository
                .findAll()
                .stream()
                .map(p -> new ProfessoresResponseDTO(
                        p.getId(), // <-- ID adicionado aqui
                        p.getNome(),
                        p.getTurno(),
                        p.getMateria()))
                .toList();
    }

    public ProfessoresResponseDTO salvarProfessor(ProfessoresRequestDTO dto) {
        if (repository.findByNome(dto.getNome()).isPresent()) {
            throw new RuntimeException("Professor já cadastrado");
        }

        ProfessoresModel novoProfessor = new ProfessoresModel();
        novoProfessor.setNome(dto.getNome());
        novoProfessor.setTurno(dto.getTurno());
        novoProfessor.setMateria(dto.getMateria());
        novoProfessor.setSalario(dto.getSalario());

        String senhaCriptografada = passwordEncoder.encode(dto.getNome());

        repository.save(novoProfessor);

        return new ProfessoresResponseDTO(
                novoProfessor.getId(), // <-- ID adicionado aqui
                novoProfessor.getNome(),
                novoProfessor.getTurno(),
                novoProfessor.getMateria()
        );
    }
}