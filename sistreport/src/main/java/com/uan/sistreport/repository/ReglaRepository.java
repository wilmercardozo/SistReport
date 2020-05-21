package com.uan.sistreport.repository;

import com.uan.sistreport.entity.Regla;
import com.uan.sistreport.entity.ReglaIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReglaRepository extends JpaRepository<Regla, ReglaIdentity> {
}
