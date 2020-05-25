package com.uan.sistreport.service.implementation;

import com.uan.sistreport.entity.Ruta;
import com.uan.sistreport.repository.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RutaService {

    @Autowired
    RutaRepository repository;

    public Ruta  setRuta(Ruta ruta){
        return repository.save(ruta);
    }
}
