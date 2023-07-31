package com.learnershigh.repository;

import com.learnershigh.domain.ClassAttend;
import com.learnershigh.domain.ClassRound;
import com.learnershigh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassAttendRepository extends JpaRepository<ClassAttend, Long> {
    ClassAttend findByClassRoundNoAndUserNo(ClassRound classRound, User user);
}

