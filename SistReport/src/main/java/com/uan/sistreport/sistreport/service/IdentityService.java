package com.uan.sistreport.sistreport.service;

import com.uan.sistreport.sistreport.repository.IdentityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;



@Service
public class IdentityService {

    @Autowired
    IdentityRepository repository;

    public String validateIdentity(String username) {
        return repository.validate(username);
    }

}
