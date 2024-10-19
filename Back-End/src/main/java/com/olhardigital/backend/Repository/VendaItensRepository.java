package com.olhardigital.backend.Repository;

import com.olhardigital.backend.Model.Venda_Itens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaItensRepository extends JpaRepository<Venda_Itens, Integer> {

}
