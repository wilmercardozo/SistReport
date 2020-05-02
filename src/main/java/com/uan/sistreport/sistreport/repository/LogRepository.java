package com.uan.sistreport.sistreport.repository;

import com.uan.sistreport.sistreport.entity.log.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<Log,Long> {
}
