package com.uan.sistreport.sistreport.entity;

import java.io.Serializable;
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final String valor;
    private final String mensaje;
    public JwtResponse(String jwttoken, String valor, String mensaje) {
        this.jwttoken = jwttoken;
        this.valor = valor;
        this.mensaje = mensaje;
    }

    public String getToken() {
        return this.jwttoken;
    }

    /**
     * @return the valor
     */
    public String getValor() {
        return valor;
    }

    /**
     * @return the mensaje
     */
    public String getMensaje() {
        return mensaje;
    }
}
