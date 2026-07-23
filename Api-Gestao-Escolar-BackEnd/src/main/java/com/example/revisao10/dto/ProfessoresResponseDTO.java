package com.example.revisao10.dto;

public class ProfessoresResponseDTO {

    private Long id;
    private String nome;
    private String materia;
    private double salario;
    private String turno;

    public ProfessoresResponseDTO() {
    }

    public ProfessoresResponseDTO(Long id, String nome, String materia, double salario, String turno) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.salario = salario;
        this.turno = turno;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }
}