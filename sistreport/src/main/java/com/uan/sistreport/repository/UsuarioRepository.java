package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario,String> {
    @Query(value="SELECT password FROM usuarios WHERE usuario = ?1",nativeQuery = true)
    String validateUser(String user);
}
