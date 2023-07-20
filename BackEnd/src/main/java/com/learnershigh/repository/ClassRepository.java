package com.learnershigh.repository;


import com.learnershigh.domain.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ClassRepository extends JpaRepository<Class, Long> {
    Class findByClassNo(Long classNo);
}




