package com.olhardigital.backend.Service;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Model.Utils.VendaResponse;
import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.VendaItens;
import com.olhardigital.backend.Repository.VendaItensRepository;
import com.olhardigital.backend.Repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaItensRepository vendaItensRepository;

    @Autowired
    private ProdutoService produtoService;


    @Transactional
    public ResponseEntity<Venda> salvarVendaComItens(Venda venda, List<VendaItens> itens) {
        Double valorTotal = 0.00;

        for (VendaItens vendaItens : itens) {
            Produto produto = produtoService.buscaPorId(vendaItens.getProduto().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Produto com ID " + vendaItens.getProduto().getId() + " não encontrado."));

            if (produto.getQuantidade() < vendaItens.getQuantidade()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Produto " + produto.getNome() + " não pode ser comprado, pois não há quantidade disponível no estoque.");
            }

            valorTotal += (produto.getValor() * vendaItens.getQuantidade());

            vendaItens.setProduto(produto);
            vendaItens.setVenda(venda);
        }

        venda.setValorTotal(valorTotal);
        venda.setValida(true);

        Venda vendaSalva = vendaRepository.save(venda);

        for (VendaItens vendaItens : itens) {
            vendaItensRepository.save(vendaItens);

            Produto produto = vendaItens.getProduto();
            produto.setQuantidade(produto.getQuantidade() - vendaItens.getQuantidade());
            produtoService.salvarOuAtualizar(produto);
        }

        return ResponseEntity.ok(vendaSalva);
    }



    public void deletarVenda(int id){
        vendaItensRepository.deleteByVendaId(id);
        vendaRepository.deleteById(id);
    }


    public ResponseEntity<VendaResponse> buscarProdutosPorVendaId(int id) {

        Optional<Venda> venda = vendaRepository.findById(id);


        if (!venda.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        VendaResponse vendaResponse = new VendaResponse();
        vendaResponse.setVenda(venda.get());
        vendaResponse.setProdutos(vendaItensRepository.findProdutosByVendaId(id));
        return ResponseEntity.ok(vendaResponse);
    }



    public Optional<Venda> buscaPorId(int id){
        return vendaRepository.findById(id);
    }


    public ResponseEntity<List<VendaResponse>> buscarTodosVendas() {
        List<Venda> vendas = vendaRepository.findAll();
        List<VendaResponse> vendaResponses = new ArrayList<>();

        vendas.sort(Comparator.comparingLong(Venda::getId).reversed());

        for (Venda venda : vendas) {
            List<VendaItens> itensVendas = vendaItensRepository.findByVendaId(venda.getId());

            VendaResponse vendaResponse = new VendaResponse();
            vendaResponse.setVenda(venda);


            Map<Produto, Integer> produtosQuantidades = new HashMap<>();

            for (VendaItens item : itensVendas) {
                Produto produto = item.getProduto();
                int quantidade = item.getQuantidade();

                produtosQuantidades.put(produto, quantidade);
            }

            vendaResponse.setQuantidade(produtosQuantidades);
            vendaResponses.add(vendaResponse);
        }

        return ResponseEntity.ok(vendaResponses);
    }
}

