package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Festivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FestivoRepository extends JpaRepository<Festivo,String> {
}
