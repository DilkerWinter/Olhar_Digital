package com.olhardigital.backend.Model;

import com.olhardigital.backend.Model.Utils.FormaPagamento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.util.List;

@Entity
@Table (name = "venda")
@Getter @Setter @ToString
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FormaPagamento formaPagamento;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private Date dataVenda;

    @Column(nullable = false)
    private double valorTotal;

    @Column
    private boolean isValida;

}
