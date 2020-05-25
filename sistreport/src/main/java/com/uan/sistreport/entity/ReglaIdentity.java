package com.uan.sistreport.entity;

import lombok.*;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReglaIdentity  implements Serializable {
    @NotNull
    private String llave;

    @NotNull
    private String grupo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReglaIdentity that = (ReglaIdentity) o;
        return Objects.equals(llave, that.llave) &&
                Objects.equals(grupo, that.grupo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(llave, grupo);
    }
}
