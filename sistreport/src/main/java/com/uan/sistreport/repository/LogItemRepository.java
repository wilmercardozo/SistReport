package com.uan.sistreport.repository;


import com.uan.sistreport.entity.LogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogItemRepository extends JpaRepository<LogItem,Long> {
}
