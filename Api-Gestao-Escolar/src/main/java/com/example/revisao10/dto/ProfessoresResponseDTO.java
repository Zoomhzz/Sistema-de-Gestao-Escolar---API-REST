package com.example.revisao10.dto;

public class ProfessoresResponseDTO {
    private Long id;
    private String nome;
    private String turno;
    private String materia;

    public ProfessoresResponseDTO() {
    }

    public ProfessoresResponseDTO(Long id, String nome, String turno, String materia) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.materia = materia;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }

    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
}