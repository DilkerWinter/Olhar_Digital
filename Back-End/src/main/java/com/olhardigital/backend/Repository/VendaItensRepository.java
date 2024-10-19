package com.olhardigital.backend.Repository;

import com.olhardigital.backend.Model.VendaItens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaItensRepository extends JpaRepository<VendaItens, Integer> {

}
