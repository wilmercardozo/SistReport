package com.uan.sistreport.model;

import com.google.gson.Gson;
import lombok.*;
import java.util.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProyectoModel {

    private String registroVenta;
    private String proyecto;
    private String cliente;
    private String descripcion;
    private Date fechaInicio;
    private Date fechaFin;
    private String clasificacion1;
    private String clasificacion2;
    private String clasificacion3;
    private boolean ingreso;
    private boolean costo;
    private boolean gasto;
    private boolean activo;
    List<ResponsableProyectoModel> responsables = new ArrayList<>();

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
