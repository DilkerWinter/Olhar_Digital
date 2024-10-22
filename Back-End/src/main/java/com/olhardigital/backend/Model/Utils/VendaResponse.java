package com.olhardigital.backend.Model.Utils;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Model.Venda;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter @Setter
public class VendaResponse {

    private Venda venda;
    private List<Produto> produtos;
}
