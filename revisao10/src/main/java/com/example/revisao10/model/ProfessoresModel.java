package com.example.revisao10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tab_pro")
public class ProfessoresModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(nullable = false,unique = true)
    private String turno;

    @Column(nullable = false)
    private String materia;

    @Column(nullable = false)
    private double salario;

    public ProfessoresModel() {
    }

    public ProfessoresModel(Long id, String nome, String turno, String materia, double salario) {
        this.id = id;
        this.nome = nome;
        this.turno = turno;
        this.materia = materia;
        this.salario = salario;
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
}
