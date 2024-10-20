package com.olhardigital.backend.Repository;

import com.olhardigital.backend.Model.VendaItens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface VendaItensRepository extends JpaRepository<VendaItens, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM VendaItens vi WHERE vi.venda.id = :vendaId")
    void deleteByVendaId(int vendaId);

    @Transactional
    @Modifying
    @Query("SELECT FROM VendaItens vi WHERE vi.venda.id = :vendaId")
    void buscarByVendaId(int vendaId);
}
