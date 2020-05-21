package com.uan.sistreport.service;

import com.uan.sistreport.entity.Regla;
import com.uan.sistreport.entity.ReglaIdentity;
import com.uan.sistreport.repository.ReglaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ReglaService {

    @Autowired
    ReglaRepository repository;

    public List<Regla> findAll(){
        return repository.findAll();
    }

    public Regla setRegla(Regla regla){
        return repository.save(regla);
    }

    public Regla findReglaById(ReglaIdentity id ){
        return  repository.findById(id).orElse(null);
    }
}
