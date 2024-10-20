package com.olhardigital.backend.Service;

import com.olhardigital.backend.Model.Produto;
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

import java.util.List;
import java.util.Optional;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaItensRepository vendaItensRepository;

    @Autowired
    private ProdutoService produtoService;

    @Transactional
    public ResponseEntity<Venda> salvarVendaComIten(Venda venda, List<VendaItens> Itens) {
        Double valorTotal = 0.00;

        vendaRepository.save(venda);

        for (VendaItens vendaItens : Itens) {
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
            vendaItensRepository.save(vendaItens);
        }

        for (VendaItens vendaItens : Itens) {
            Optional<Produto> produto = produtoService.buscaPorId(vendaItens.getProduto().getId());

            produto.get().setQuantidade(produto.get().getQuantidade() - vendaItens.getQuantidade());
            produtoService.salvarOuAtualizar(produto.orElse(null));
        }


        venda.setValorTotal(valorTotal);
        venda.setValida(true);
        return ResponseEntity.ok(vendaRepository.save(venda));
    }


    public void deletarVenda(int id){
        vendaItensRepository.deleteByVendaId(id);
        vendaRepository.deleteById(id);
    }
    public Optional<ResponseEntity>  buscarVendaCompleta(int id){

    }

    public Optional<Venda> buscaPorId(int id){
        return vendaRepository.findById(id);

    }
}

