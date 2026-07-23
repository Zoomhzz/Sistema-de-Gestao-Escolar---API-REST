package com.example.revisao10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Tab_alunos")
public class AlunosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    // CORREÇÃO: Removido o unique = true
    @Column(nullable = false)
    private String turno;

    // MELHORIA: Adicionado o unique = true (não podem existir duas matrículas iguais)
    @Column(nullable = false, unique = true)
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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getTurma() { return turma; }
    public void setTurma(String turma) { this.turma = turma; }
}