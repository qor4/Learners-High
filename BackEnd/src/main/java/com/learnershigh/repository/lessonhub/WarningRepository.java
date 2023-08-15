package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.Warning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarningRepository extends JpaRepository<Warning, Long> {

List<Warning> findAllByLessonRoundNoAndUserNo(Long lessonRoundNo, Long userNo);


List<Warning> findAllByLessonRoundNo(Long lessonRoundNo);
}

