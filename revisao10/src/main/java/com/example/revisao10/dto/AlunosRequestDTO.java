package com.example.revisao10.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AlunosRequestDTO {
    @NotBlank(message = "O nome do Aluno é obrigatório")
    @Size(max = 200, message = "O nome deve ter menos de 200 caracteres")
    private String nome;

    @NotBlank(message = "A matrícula é obrigatoria")
    @Size(min = 10, max = 13, message = "A matricula é obrigatoria")
    private String matricula;


    @NotBlank(message = "O numero da turma é obrigatorio")
    @Size(min = 10, max = 13, message = "A turma é obrigatoria")
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

    public @NotBlank(message = "O nome do Aluno é obrigatório") @Size(max = 200, message = "O nome deve ter menos de 200 caracteres") String getNome() {
        return nome;
    }

    public void setNome(@NotBlank(message = "O nome do Aluno é obrigatório") @Size(max = 200, message = "O nome deve ter menos de 200 caracteres") String nome) {
        this.nome = nome;
    }

    public @NotBlank(message = "A matrícula é obrigatoria") @Size(min = 10, max = 13, message = "A matricula é obrigatoria") String getMatricula() {
        return matricula;
    }

    public void setMatricula(@NotBlank(message = "A matrícula é obrigatoria") @Size(min = 10, max = 13, message = "A matricula é obrigatoria") String matricula) {
        this.matricula = matricula;
    }

    public @NotBlank(message = "O numero da turma é obrigatorio") @Size(min = 10, max = 13, message = "A turma é obrigatoria") String getTurma() {
        return turma;
    }

    public void setTurma(@NotBlank(message = "O numero da turma é obrigatorio") @Size(min = 10, max = 13, message = "A turma é obrigatoria") String turma) {
        this.turma = turma;
    }

    public @NotBlank(message = "Turno deve ser informado") @Size(max = 20, message = "O turno deve ter menos de 20 caracteres") String getTurno() {
        return turno;
    }

    public void setTurno(@NotBlank(message = "Turno deve ser informado") @Size(max = 20, message = "O turno deve ter menos de 20 caracteres") String turno) {
        this.turno = turno;
    }
}
