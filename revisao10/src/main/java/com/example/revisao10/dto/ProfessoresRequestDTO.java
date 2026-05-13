package com.example.revisao10.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class ProfessoresRequestDTO {
    @NotBlank(message = "O nome do professor é obrigatório")
    @Size(max = 200, message = "O nome deve ter menos de 200 caracteres")
    private String nome;

    @NotBlank(message = "O turno é obrigatório")
    private String turno;

    @NotBlank(message = "A matéria é obrigatória")
    private String materia;

    @Positive(message = "O salário deve ser um valor positivo")
    private double salario;

    public ProfessoresRequestDTO() {
    }

    public ProfessoresRequestDTO(String nome, String turno, String materia, double salario) {
        this.nome = nome;
        this.turno = turno;
        this.materia = materia;
        this.salario = salario;
    }


    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }
    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }
}