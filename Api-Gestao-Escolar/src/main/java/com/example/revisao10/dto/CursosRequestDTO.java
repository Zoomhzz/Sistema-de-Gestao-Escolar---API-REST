package com.example.revisao10.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CursosRequestDTO {
    @NotBlank(message = "O nome do curso é obrigatório")
    @Size(max = 200)
    private String nome;

    @NotBlank(message = "A matéria é obrigatória")
    private String materia;

    @NotNull(message = "O número de alunos é obrigatório")
    @Positive(message = "O número de alunos deve ser maior que zero")
    private Integer n_alunos;

    @NotBlank(message = "O nome do professor é obrigatório")
    private String professor;

    public CursosRequestDTO() {
    }

    public CursosRequestDTO(String nome, String materia, Integer n_alunos, String professor) {
        this.nome = nome;
        this.materia = materia;
        this.n_alunos = n_alunos;
        this.professor = professor;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }

    public Integer getN_alunos() { return n_alunos; }
    public void setN_alunos(Integer n_alunos) { this.n_alunos = n_alunos; }

    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }
}