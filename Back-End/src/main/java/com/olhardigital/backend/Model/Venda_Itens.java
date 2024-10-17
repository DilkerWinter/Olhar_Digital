package com.olhardigital.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table (name = "venda_itens")
@Getter @Setter @ToString
public class Venda_Itens {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "venda_id", nullable = false)
    private Venda venda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "produto_id", nullable = false)
    private Produto produto;

    @Column (nullable = false)
    private int quantidade;

}
