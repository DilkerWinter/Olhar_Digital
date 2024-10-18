package com.olhardigital.backend.Service;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto salvarOuAtualizar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public void deletarById(int id) {
        produtoRepository.deleteById(id);
    }

    public Optional<Produto> buscaPorId(int id) {
        return produtoRepository.findById(id);
    }

}
