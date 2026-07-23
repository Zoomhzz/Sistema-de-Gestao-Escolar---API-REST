package com.example.revisao10.dto;

public class AlunosResponseDTO {
    private String nome;
    private String matricula;
    private String turno;

    public AlunosResponseDTO() {
    }

    public AlunosResponseDTO(String nome, String matricula, String turno) {
        this.nome = nome;
        this.matricula = matricula;
        this.turno = turno;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }
}
