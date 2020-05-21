package com.uan.sistreport.service;


import com.uan.sistreport.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UsuarioRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) {
        String pass = "";
        try {
            pass = repository.validateUser(username);
        }catch (Exception e){
            System.out.println("No se encontro el usuario : " + username);
        }
        if (pass != null && !pass.isEmpty()) {
            return new User(username, pass, new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("No se encontro el usuario : " + username);
        }
    }
}