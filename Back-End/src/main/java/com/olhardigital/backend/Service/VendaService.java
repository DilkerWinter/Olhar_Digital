package com.olhardigital.backend.Service;

import com.olhardigital.backend.Repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;


}
