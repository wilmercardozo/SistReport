package com.uan.sistreport.sistreport.repository;


import com.uan.sistreport.sistreport.entity.log.LogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogItemRepository extends JpaRepository<LogItem,Long> {
}
