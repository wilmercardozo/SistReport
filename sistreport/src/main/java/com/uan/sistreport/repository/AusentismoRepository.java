package com.uan.sistreport.repository;

import java.util.*;
import com.uan.sistreport.entity.Ausentismo;
import com.uan.sistreport.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AusentismoRepository extends JpaRepository<Ausentismo,Long> {

    List<Ausentismo> findAllByUsuario(Usuario usuario);
}
