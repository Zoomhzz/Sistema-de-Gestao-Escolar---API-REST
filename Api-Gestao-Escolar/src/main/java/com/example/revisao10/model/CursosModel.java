package com.example.revisao10.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tab_cursos") // Ou o nome exato da sua tabela no MySQL
public class CursosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cargaHoraria;
    private String area;

    public CursosModel() {
    }

    public CursosModel(Long id, String nome, String cargaHoraria, String area) {
        this.id = id;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.area = area;
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

    public String getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(String cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}