package com.example.revisao10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Tab_alunos")
public class AlunosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,length = 200)
    private String nome;

    @Column(nullable = false, unique = true)
    private String turno;

    @Column(nullable = false)
    private String matricula;

    @Column(nullable = false)
    private String turma;

    public AlunosModel() {
    }

    public AlunosModel(Long id, String nome, String turno, String matricula, String turma) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.matricula = matricula;
        this.turma = turma;
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

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getTurma() {
        return turma;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }
}
