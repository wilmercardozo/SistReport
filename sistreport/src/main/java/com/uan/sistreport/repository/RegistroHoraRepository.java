package com.uan.sistreport.repository;

import com.uan.sistreport.entity.RegistroHora;
import com.uan.sistreport.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface RegistroHoraRepository extends JpaRepository<RegistroHora,Long> {
    List<RegistroHora>  findAllByUsuarioregistro(Usuario usuario);
}
