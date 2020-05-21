package com.uan.sistreport.service;

import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    public Usuario createUser(Usuario usuario){
        return repository.save(usuario);
    }

}
