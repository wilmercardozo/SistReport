package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Funcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionRepository extends JpaRepository<Funcion,Long> {
}
