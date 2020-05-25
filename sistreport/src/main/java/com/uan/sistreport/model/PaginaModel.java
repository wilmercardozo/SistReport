package com.uan.sistreport.model;

import com.google.gson.Gson;
import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PaginaModel {
    private String icon;
    private boolean isCollapsed;
    private String rol;
    private List<RutaModel> paginas;

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
