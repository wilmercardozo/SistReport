package com.uan.sistreport.repository;

import com.uan.sistreport.entity.EstadoRegistro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoRegistroRepository extends JpaRepository<EstadoRegistro,Long> {
}
