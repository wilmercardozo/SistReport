package com.uan.sistreport.service;

import cn.hutool.core.lang.Func;
import com.uan.sistreport.entity.Funcion;
import com.uan.sistreport.repository.FuncionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class FuncionService {

    @Autowired
    FuncionRepository repository;

    public List<Funcion> findAll(){
        return repository.findAll();
    }

    public Funcion findById(Long id){
        return repository.findById(id).orElse(null);
    }

    public Funcion setFuncion(Funcion funcion){
        return repository.save(funcion);
    }


}
