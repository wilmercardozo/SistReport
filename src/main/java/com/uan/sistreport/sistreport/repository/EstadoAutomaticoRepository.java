package com.uan.sistreport.sistreport.repository;

import com.uan.sistreport.sistreport.entity.parametrica.EstadoAutomatico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoAutomaticoRepository extends JpaRepository<EstadoAutomatico,Long> {
}
