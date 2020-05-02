package com.uan.sistreport.SistReport.repository;

import com.uan.sistreport.SistReport.entity.parametrica.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaRepository extends JpaRepository<Area,Long> {
}
