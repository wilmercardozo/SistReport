package com.uan.sistreport.service;

import com.sun.tools.javac.util.List;
import com.uan.sistreport.entity.EstadoRegistro;
import com.uan.sistreport.repository.EstadoRegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoRegistroService {

    @Autowired
    EstadoRegistroRepository repository;

    public EstadoRegistro setEstadoRegistro(EstadoRegistro estadoRegistro){
        return repository.save(estadoRegistro);
    }
    public EstadoRegistro getEstadoRegistroById(Long id){
        return repository.findById(id).orElse(null);
    }
    public List<EstadoRegistro> getAll(){
        return (List<EstadoRegistro>) repository.findAll();
    }
}
