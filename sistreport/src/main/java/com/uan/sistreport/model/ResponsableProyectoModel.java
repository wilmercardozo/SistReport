package com.uan.sistreport.model;

import com.google.gson.Gson;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ResponsableProyectoModel {
    public long id;
    public String nombre;

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}

