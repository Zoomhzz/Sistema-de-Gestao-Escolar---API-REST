package com.example.revisao10.dto;

public class AlunosResponseDTO {
    private Long id;
    private String nome;
    private String matricula;
    private String turno;

    public AlunosResponseDTO() {
    }

    public AlunosResponseDTO(Long id, String nome, String matricula, String turno) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.turno = turno;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }
}