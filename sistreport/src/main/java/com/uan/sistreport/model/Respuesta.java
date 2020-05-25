package com.uan.sistreport.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class Respuesta implements Serializable {
    private static final long serialVersionUID = 1L;
    //private String jwttoken;
    private boolean estado;
    private String mensaje1;
    private String mensaje2;
    private String mensaje3;
    private String mensaje4;


}
