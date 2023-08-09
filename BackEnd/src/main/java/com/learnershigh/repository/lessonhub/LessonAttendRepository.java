package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonAttendRepository extends JpaRepository<LessonAttend, Long> {
    LessonAttend findByLessonRoundNoAndUserNo(LessonRound lessonRound, User user);
}

