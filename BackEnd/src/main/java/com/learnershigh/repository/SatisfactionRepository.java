package com.learnershigh.repository;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.Satisfaction;
import com.learnershigh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SatisfactionRepository extends JpaRepository<Satisfaction, Integer> {
    List<Satisfaction> findAllByTeacherNo(User teacherNo);

    List<Satisfaction> findAllByClassNo(Class classNo);

}
