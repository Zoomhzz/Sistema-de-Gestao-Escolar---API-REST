package com.example.revisao10.dto;

public class ProfessoresResponseDTO {
    private String nome;
    private String turno;
    private String materia;

    public ProfessoresResponseDTO() {
    }

    public ProfessoresResponseDTO(String nome, String turno, String materia) {
        this.nome = nome;
        this.turno = turno;
        this.materia = materia;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }
    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
}