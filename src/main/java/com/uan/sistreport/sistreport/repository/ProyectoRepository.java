package com.uan.sistreport.SistReport.repository;

import com.uan.sistreport.sistreport.entity.parametrica.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto,Long> {
}
