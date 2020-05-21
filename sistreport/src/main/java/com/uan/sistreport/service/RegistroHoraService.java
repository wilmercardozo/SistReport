package com.uan.sistreport.service;

import java.util.*;
import com.uan.sistreport.entity.RegistroHora;
import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.repository.RegistroHoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroHoraService {

    @Autowired
    RegistroHoraRepository repository;

    public List<RegistroHora> findAll(){
        return repository.findAll();
    }

    public List<RegistroHora> findAllByUsuario(Usuario usuario){
        return repository.findAllByUsuarioregistro(usuario);
    }

    public RegistroHora setRegisroHora(RegistroHora registroHora){
        return repository.save(registroHora);
    }


}
