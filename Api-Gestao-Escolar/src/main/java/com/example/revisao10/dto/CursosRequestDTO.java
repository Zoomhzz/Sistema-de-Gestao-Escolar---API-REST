package com.example.revisao10.dto;

import jakarta.validation.constraints.NotBlank;

public class CursosRequestDTO {

    @NotBlank(message = "O nome do curso é obrigatório")
    private String nome;

    @NotBlank(message = "A carga horária é obrigatória")
    private String cargaHoraria;

    @NotBlank(message = "A área é obrigatória")
    private String area;

    public CursosRequestDTO() {
    }

    public CursosRequestDTO(String nome, String cargaHoraria, String area) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.area = area;
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