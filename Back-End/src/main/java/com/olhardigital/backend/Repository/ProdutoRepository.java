package com.olhardigital.backend.Repository;

import com.olhardigital.backend.Model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {


    @Query("SELECT p FROM Produto p ORDER BY CASE WHEN p.quantidade = 0 THEN 1 ELSE 0 END, p.id")
    List<Produto> findAllOrderedByQuantidade();
}
