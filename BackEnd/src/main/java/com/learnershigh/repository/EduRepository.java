package com.learnershigh.repository;


import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EduRepository extends JpaRepository<EduCareer, Long>{

    EduCareer findByUserNo(Long userNo);

    EduCareer findByeduCareerNo(Long eduCareerNo);

    List<EduCareer> findAllByUserNo(User userNo);


}
