package com.olhardigital.backend.Controller;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Model.Utils.FormaPagamento;
import com.olhardigital.backend.Model.Utils.VendaResponse;
import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.Utils.VendaRequest;
import com.olhardigital.backend.Service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> criarVendaComItens(@RequestBody VendaRequest vendaRequest){
        ResponseEntity<Venda> response = vendaService.salvarVendaComItens(vendaRequest.getVenda(), vendaRequest.getItens());
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

    @GetMapping("/buscaPorId/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable  int id){
        Optional<Venda> venda = vendaService.buscaPorId(id);
        if (venda.isPresent()) {
            return ResponseEntity.ok(venda.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponse> buscarProdutosPorVendaId(@PathVariable int id) {
        return vendaService.buscarProdutosPorVendaId(id);
    }

    @GetMapping("/buscaTodas")
    public ResponseEntity<List<VendaResponse>> buscarTodasVendas(){
        return vendaService.buscarTodosVendas();
    }


    @GetMapping("/buscaFormasPagamento")
    public ResponseEntity<List<Map<String, String>>> buscarVendaFormasPagamento() {
        List<Map<String, String>> formasPagamento = new ArrayList<>();

        for (FormaPagamento forma : FormaPagamento.values()) {
            Map<String, String> formaMap = new HashMap<>();
            formaMap.put("formaPagamento", forma.name());
            formaMap.put("descricao", forma.getDescricao());
            formasPagamento.add(formaMap);
        }

        return ResponseEntity.ok(formasPagamento);
    }

}
