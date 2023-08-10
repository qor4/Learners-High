package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonAttendRepository extends JpaRepository<LessonAttend, Long> {
    LessonAttend findByLessonRoundNoAndUserNo(LessonRound lessonRound, User user);

    List<LessonAttend> findByLessonRoundNoIn(List<LessonRound> lessonRoundList);

    List<LessonAttend> findByUserNoAndLessonRoundNoIn(User user, List<LessonRound> lessonRoundList);
}

