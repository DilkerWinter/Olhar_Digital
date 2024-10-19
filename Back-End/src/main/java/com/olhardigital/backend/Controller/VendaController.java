package com.olhardigital.backend.Controller;

import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.VendaRequest;
import com.olhardigital.backend.Service.ProdutoService;
import com.olhardigital.backend.Service.VendaService;
import lombok.experimental.Delegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> criarVendaComItens(@RequestBody VendaRequest vendaRequest){
        ResponseEntity<Venda> response = vendaService.salvarVendaComIten(vendaRequest.getVenda(), vendaRequest.getItens());

        return response;

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Venda> deletarVenda(@PathVariable int id){
        Optional<Venda> venda = vendaService.buscaPorId(id);
        if (venda.isPresent()) {
            vendaService.deletarVenda(id);
            return ResponseEntity.ok(venda.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable  int id){
        Optional<Venda> venda = vendaService.buscaPorId(id);
        if (venda.isPresent()) {
            return ResponseEntity.ok(venda.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
