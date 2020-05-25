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
@Table(name="usuarios" )
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String usuario;

    @NotNull
    @NotBlank
    private String password;

    @NotNull
    @NotBlank
    private String nombres;

    @NotNull
    @NotBlank
    private String email;

    @NotNull
    @NotBlank
    private String documento;

    @NotNull
    @NotBlank
    private String proyectoBase;

    @NotNull
    @NotBlank
    private String jefeInmediato;

    @NotNull
    @NotBlank
    private String cargo;

    @ManyToOne
    @JoinColumn(name ="FK_RolId")
    private Rol rol;

    @ManyToOne
    @JoinColumn(name ="FK_ResponsablesId")
    private Proyecto proyecto;

    private boolean activo;

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
