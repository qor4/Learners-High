package com.learnershigh.repository.user;


import com.learnershigh.domain.user.EduCareer;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EduRepository extends JpaRepository<EduCareer, Long>{

    EduCareer findByUserNo(Long userNo);

    EduCareer findByeduCareerNo(Long eduCareerNo);

    List<EduCareer> findAllByUserNo(User userNo);

    List<EduCareer> findAllByUserNoOrderByEduStartDateAsc(User userNo);


}
