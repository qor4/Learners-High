package com.learnershigh.repository.user;


import com.learnershigh.domain.user.EduCareer;
import com.learnershigh.domain.user.JobCareer;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobCareer, Long> {

    JobCareer findByUserNo(Long userNo);

    JobCareer findByJobCareerNo(Long jobCareerNo);

    List<JobCareer> findAllByUserNo(User userNo);

    List<JobCareer> findAllByUserNoOrderByHireStartDateAsc(User userNo);


}
