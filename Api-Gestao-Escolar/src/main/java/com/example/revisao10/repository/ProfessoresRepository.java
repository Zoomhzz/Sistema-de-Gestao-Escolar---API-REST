package com.example.revisao10.repository;

import com.example.revisao10.model.ProfessoresModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessoresRepository extends JpaRepository<ProfessoresModel, Long> {
    Optional<ProfessoresModel> findByNome (String nome);
}
