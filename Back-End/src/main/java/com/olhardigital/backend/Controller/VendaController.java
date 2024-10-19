package com.olhardigital.backend.Controller;

import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.VendaRequest;
import com.olhardigital.backend.Service.ProdutoService;
import com.olhardigital.backend.Service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public Venda criarVendaComItens(@RequestBody VendaRequest vendaRequest){
        Venda novaVenda = vendaService.salvarVendaComIten(vendaRequest.getVenda(), vendaRequest.getItens());
        return novaVenda;
    }

}
