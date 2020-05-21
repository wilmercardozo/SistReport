package com.uan.sistreport.service;

import com.uan.sistreport.entity.Rol;
import com.uan.sistreport.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RolService {

    @Autowired
    RolRepository repository;

    public List<Rol> findAll(){
        return repository.findAll();
    }

    public Rol findRolById(Long id){
        return repository.findById(id).orElse(null);
    }

    public Rol setRol(Rol rol){
        return repository.save(rol);
    }


}
