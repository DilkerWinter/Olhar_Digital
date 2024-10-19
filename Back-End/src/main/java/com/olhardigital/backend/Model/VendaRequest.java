package com.olhardigital.backend.Model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Setter @Getter @ToString
public class VendaRequest {
    private Venda venda;
    private List<VendaItens> itens;
}