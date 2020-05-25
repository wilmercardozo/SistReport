package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario,Long> {
    @Query(value="SELECT password FROM usuarios WHERE usuario = ?1",nativeQuery = true)
    String validateUser(String user);

    Usuario findByUsuario(String usuario);

    List<Usuario> findAllByProyectoIsNotNull();
}
