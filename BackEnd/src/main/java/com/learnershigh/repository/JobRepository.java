package com.learnershigh.repository;


import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobCareer, Long> {

    JobCareer findByUserNo(Long userNo);

    JobCareer findByJobCareerNo(Long jobCareerNo);

    List<JobCareer> findAllByUserNo(User userNo);

}
