
package com.uan.sistreport.model;

import com.google.gson.Gson;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParametroModel {
    private String tipo;
    private String variable;
    private String valor;

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
