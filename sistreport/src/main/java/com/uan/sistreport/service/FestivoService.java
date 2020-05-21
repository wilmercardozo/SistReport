package com.uan.sistreport.service;

import com.uan.sistreport.entity.Festivo;
import com.uan.sistreport.repository.FestivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class FestivoService {

    @Autowired
    FestivoRepository repository;

    public List<Festivo> findAll(){
        return repository.findAll();
    }

    public Festivo setFestivo(Festivo festivo){
        return repository.save(festivo);
    }

    public Festivo findById(String id){
        return repository.findById(id).orElse(null);
    }

}
