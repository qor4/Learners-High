package com.learnershigh.repository;


import com.learnershigh.domain.ClassType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassTypeRepository extends JpaRepository<ClassType, Integer> {
    ClassType findByClassTypeNo(int classTypeNo);
}




