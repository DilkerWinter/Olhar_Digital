package com.olhardigital.backend.Model;

import jakarta.persistence.*;

@Entity
@Table (name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @Column (nullable = false)
    private String nome;

    @Column
    private String descricao;

    @Column (nullable = false)
    private double valor;
}
