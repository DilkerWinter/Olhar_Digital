package com.olhardigital.backend.Controller;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    @CrossOrigin ("http://localhost:4200/")
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto){
        return produtoService.salvarOuAtualizar(produto);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable int id, @RequestBody Produto produtoNovo){
        Optional<Produto> produto = produtoService.buscaPorId(id);
        if (produto.isPresent()) {
            Produto produtoAtualizado = produto.get();
            produtoAtualizado.setNome(produtoNovo.getNome());
            produtoAtualizado.setDescricao(produtoNovo.getDescricao());
            produtoAtualizado.setQuantidade(produtoNovo.getQuantidade());
            produtoAtualizado.setValor(produtoNovo.getValor());
            produtoAtualizado.setDescricao(produtoNovo.getDescricao());
            produtoAtualizado.setUrlImagem(produtoNovo.getUrlImagem());
            return ResponseEntity.ok(produtoService.salvarOuAtualizar(produtoAtualizado));
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> deletarProduto(@PathVariable int id){
        Optional<Produto> produto = produtoService.buscaPorId(id);
        if (produto.isPresent()) {
            produtoService.deletarById(id);
            return ResponseEntity.ok(produto.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscaPorId(@PathVariable int id) {
        Optional<Produto> produto = produtoService.buscaPorId(id);

        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
