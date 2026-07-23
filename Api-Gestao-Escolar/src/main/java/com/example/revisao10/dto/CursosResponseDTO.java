package com.example.revisao10.dto;

public class CursosResponseDTO {
    private Long id; // É comum retornar o ID no response para facilitar edições posteriores
    private String nome;
    private String materia;
    private String professor;

    public CursosResponseDTO() {
    }

    public CursosResponseDTO(Long id, String nome, String materia, String professor) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.professor = professor;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }
}