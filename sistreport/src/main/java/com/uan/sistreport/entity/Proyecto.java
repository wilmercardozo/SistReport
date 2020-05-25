package com.uan.sistreport.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="proyectos" )
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proyecto {
    @Id
    private String registroventa;

    @NotNull
    private String proyecto;

    @NotNull
    @NotBlank
    private String cliente;

    @NotNull
    @NotBlank
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
    @OneToMany(fetch = FetchType.EAGER, mappedBy="proyecto", cascade = CascadeType.PERSIST)
    Set<Usuario> responsables = new HashSet();

    @JsonIgnore
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    @JsonIgnore
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;


}
