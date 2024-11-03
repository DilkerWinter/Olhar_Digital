package com.olhardigital.backend.Model.Utils;

public enum FormaPagamento {
    CREDITO("Crédito"),
    DEBITO("Débito"),
    PIX("Pix"),
    BOLETO("Boleto"),
    DINHEIRO("Dinheiro");

    private final String descricao;

    FormaPagamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }
}
