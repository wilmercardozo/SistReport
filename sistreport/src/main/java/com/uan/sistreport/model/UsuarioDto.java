package com.uan.sistreport.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UsuarioDto {
    private String usuario;
    private String password;
}
