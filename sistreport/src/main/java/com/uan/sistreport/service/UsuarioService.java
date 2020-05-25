package com.uan.sistreport.service;

import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.model.ParametroModel;
import com.uan.sistreport.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    public Usuario createUser(Usuario usuario){
        return repository.save(usuario);
    }

    public Usuario getUsusarioByUsuario(String id){
        return repository.findByUsuario(id);
    }

    public Usuario getUsuarioById(Long id){
        return repository.findById(id).get();
    }
    public List<Usuario> findAllResponsables(){
        return repository.findAllByProyectoIsNotNull();
    }
}
