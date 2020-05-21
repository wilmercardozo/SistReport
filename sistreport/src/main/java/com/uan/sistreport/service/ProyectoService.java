package com.uan.sistreport.service;

import java.util.*;
import com.uan.sistreport.entity.Proyecto;
import com.uan.sistreport.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {
    @Autowired
    ProyectoRepository repository;

    public Proyecto setProyecto(Proyecto proyecto){
        return repository.save(proyecto);
    }

    public Proyecto getProyectoById(String id){
        return repository.findById(id).orElse(null);
    }

    public List<Proyecto> findAll(){
        return repository.findAll();
    }

}
