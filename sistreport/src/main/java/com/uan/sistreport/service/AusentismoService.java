package com.uan.sistreport.service;

import java.util.*;
import com.uan.sistreport.entity.Ausentismo;
import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.repository.AusentismoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AusentismoService {

    @Autowired
    AusentismoRepository repository;

    public List<Ausentismo> findAll(){
        return repository.findAll();
    }

    public Ausentismo setAusentismo(Ausentismo ausentismo){
        return repository.save(ausentismo);
    }

    public List<Ausentismo> findAllByUsuario(Usuario usuario){
        return repository.findAllByUsuario(usuario);
    }

    public Ausentismo findById(Long id){
        return repository.findById(id).orElse(null);
    }
}
