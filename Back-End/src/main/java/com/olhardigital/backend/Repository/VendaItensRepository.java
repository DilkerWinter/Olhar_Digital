package com.olhardigital.backend.Repository;

import com.olhardigital.backend.Model.Produto;
import com.olhardigital.backend.Model.VendaItens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface VendaItensRepository extends JpaRepository<VendaItens, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM VendaItens vi WHERE vi.venda.id = :vendaId")
    void deleteByVendaId(int vendaId);

   List<VendaItens> findByVendaId(int vendaId);

    @Query("SELECT p FROM Produto p JOIN VendaItens vi ON vi.produto.id = p.id WHERE vi.venda.id = :vendaId")
    List<Produto> findProdutosByVendaId(int vendaId);

}
