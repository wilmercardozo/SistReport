package com.uan.sistreport.sistreport.repository;

import com.uan.sistreport.sistreport.entity.parametrica.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository <Usuario,Long>{
}
