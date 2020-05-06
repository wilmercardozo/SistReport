package com.uan.sistreport.sistreport.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uan.sistreport.sistreport.entity.Identity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentityRepository extends JpaRepository<Identity, String> {
    @Query(value="Select password FROM identity WHERE username = #{username}", nativeQuery = true)
    public String validate(@Param("username") String username);
}
