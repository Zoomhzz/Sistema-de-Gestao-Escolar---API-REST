package com.example.revisao10.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AlunosRequestDTO {
    @NotBlank(message = "O nome do Aluno é obrigatório")
    @Size(max = 200, message = "O nome deve ter menos de 200 caracteres")
    private String nome;

    @NotBlank(message = "A matrícula é obrigatória")
    @Size(min = 5, max = 13, message = "A matrícula deve ter entre 5 e 13 caracteres")
    private String matricula;

    @NotBlank(message = "O numero da turma é obrigatorio")
    @Size(max = 50, message = "A turma deve ter menos de 50 caracteres")
    private String turma;

    @NotBlank(message = "Turno deve ser informado")
    @Size(max = 20, message = "O turno deve ter menos de 20 caracteres")
    private String turno;

    public AlunosRequestDTO() {
    }

    public AlunosRequestDTO(String nome, String matricula, String turma, String turno) {
        this.nome = nome;
        this.matricula = matricula;
        this.turma = turma;
        this.turno = turno;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getTurma() { return turma; }
    public void setTurma(String turma) { this.turma = turma; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }
}