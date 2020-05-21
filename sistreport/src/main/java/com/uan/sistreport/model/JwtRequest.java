package com.uan.sistreport.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private String usuario;
    private String password;
}


