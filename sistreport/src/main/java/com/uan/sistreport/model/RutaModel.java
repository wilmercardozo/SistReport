package com.uan.sistreport.model;

import com.google.gson.Gson;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RutaModel {
    private String path;
    private String title;
    private String icon;
    private String clase;

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
