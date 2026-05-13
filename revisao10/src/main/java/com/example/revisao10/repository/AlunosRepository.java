package com.example.revisao10.repository;

import com.example.revisao10.model.AlunosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunosRepository extends JpaRepository<AlunosModel,Long> {
    Optional<AlunosModel> findByMatricula (String matricula);
}
