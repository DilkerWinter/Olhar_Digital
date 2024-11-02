package com.olhardigital.backend.Model.Utils;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Model.Venda;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Getter @Setter
public class VendaResponse {

    private Venda venda;
    private List<Produto> produtos;
    private Map<Produto, Integer> quantidade = new HashMap<>();
}
