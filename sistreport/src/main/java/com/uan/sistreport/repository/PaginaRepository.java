package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Pagina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaginaRepository extends JpaRepository<Pagina,Long> {
}
