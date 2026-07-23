package com.example.revisao10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cursos")
public class CursosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(nullable = false)
    private String materia;

    // AQUI ESTÁ A CORREÇÃO: Alterado de String para Integer
    @Column(nullable = false)
    private Integer n_alunos;

    @Column(nullable = false)
    private String professor;

    public CursosModel() {
    }

    public CursosModel(Long id, String nome, String materia, Integer n_alunos, String professor) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.n_alunos = n_alunos;
        this.professor = professor;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }

    public Integer getN_alunos() { return n_alunos; }
    public void setN_alunos(Integer n_alunos) { this.n_alunos = n_alunos; }

    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }
}