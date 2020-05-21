package com.uan.sistreport.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;
   //private String jwttoken;
    private boolean estado;
    private String mensaje1;
    private String mensaje2;
    private String mensaje3;
    private String mensaje4;
    public JwtResponse(boolean estado,String mensaje1) {
      //  this.jwttoken = jwttoken;
        this.estado= estado;
        this.mensaje1 = mensaje1;
    }
}