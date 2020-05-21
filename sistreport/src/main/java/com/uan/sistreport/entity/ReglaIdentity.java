package com.uan.sistreport.entity;

import lombok.*;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReglaIdentity  implements Serializable {
    @NotNull
    private String llave;

    @NotNull
    private String grupo;

}
