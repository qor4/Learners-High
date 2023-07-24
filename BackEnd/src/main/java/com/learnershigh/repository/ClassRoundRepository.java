package com.learnershigh.repository;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.ClassRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassRoundRepository extends JpaRepository<ClassRound, Long> {
    @Query(value = "SELECT CR FROM ClassRound CR WHERE CR.classNo.classNo = :classNo")
    List<ClassRound> findByClassNo(@Param("classNo") Long classNo);
}




