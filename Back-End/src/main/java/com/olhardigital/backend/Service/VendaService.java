package com.olhardigital.backend.Service;

import com.olhardigital.backend.Model.Venda;
import com.olhardigital.backend.Model.Venda_Itens;
import com.olhardigital.backend.Repository.VendaItensRepository;
import com.olhardigital.backend.Repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaItensRepository vendaItensRepository;

    @Transactional
    public Venda salvarVendaComIten(Venda venda, List<Venda_Itens> Itens ){
        return null;

    }



}

