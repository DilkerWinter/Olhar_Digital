package com.olhardigital.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table (name = "produto")
@Getter @Setter @ToString
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column (nullable = false)
    private String nome;

    @Column
    private String descricao;

    @Column(nullable = false)
    private int quantidade;

    @Column(nullable = false)
    private double valor;

    @Column
    private String urlImagem;


}
