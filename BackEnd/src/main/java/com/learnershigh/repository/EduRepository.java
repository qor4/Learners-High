package com.learnershigh.repository;


import com.learnershigh.domain.EduCareer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EduRepository extends JpaRepository<EduCareer, Long>{

}
