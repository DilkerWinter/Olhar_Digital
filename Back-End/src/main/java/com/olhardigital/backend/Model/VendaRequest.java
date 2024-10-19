package com.olhardigital.backend.Model;
import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.Venda_Itens;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Setter @Getter @ToString
public class VendaRequest {
    private Venda venda;
    private List<Venda_Itens> itens;
}
