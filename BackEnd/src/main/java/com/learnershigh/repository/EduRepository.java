package com.learnershigh.repository;


import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EduRepository extends JpaRepository<EduCareer, Long>{

    EduCareer findByUserNo(Long userNo);
}
