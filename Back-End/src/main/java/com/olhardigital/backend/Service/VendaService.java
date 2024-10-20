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

import java.util.List;
import java.util.Optional;
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

            // Calcular o valor total com base no preço e quantidade
            valorTotal += (produto.getValor() * vendaItens.getQuantidade());

            // Setar a venda e o produto nos itens
            vendaItens.setProduto(produto);
            vendaItens.setVenda(venda);
        }

        // Definir o valor total da venda
        venda.setValorTotal(valorTotal);
        venda.setValida(true);

        // Salvar a venda primeiro
        Venda vendaSalva = vendaRepository.save(venda);

        // Agora salvar os itens, pois a venda já foi persistida
        for (VendaItens vendaItens : itens) {
            vendaItensRepository.save(vendaItens);

            // Atualizar o estoque do produto
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
}

