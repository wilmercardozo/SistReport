package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Ruta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RutaRepository extends JpaRepository<Ruta,Long> {
}
