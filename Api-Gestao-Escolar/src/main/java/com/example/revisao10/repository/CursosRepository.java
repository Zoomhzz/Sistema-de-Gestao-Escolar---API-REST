package com.example.revisao10.repository;

import com.example.revisao10.model.CursosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CursosRepository extends JpaRepository<CursosModel, Long> {
    Optional<CursosModel> findByNome(String nome);
}