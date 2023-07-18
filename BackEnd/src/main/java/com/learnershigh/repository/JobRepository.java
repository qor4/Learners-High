package com.learnershigh.repository;


import com.learnershigh.domain.JobCareer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<JobCareer, Long> {


}
