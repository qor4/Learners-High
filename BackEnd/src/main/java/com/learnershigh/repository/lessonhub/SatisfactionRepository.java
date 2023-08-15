package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SatisfactionRepository extends JpaRepository<Satisfaction, Integer> {
    List<Satisfaction> findAllByTeacherNo(User teacherNo);

    List<Satisfaction> findAllByLessonNo(Lesson lessonNo);

    Satisfaction findByLessonRoundNoAndTeacherNoAndStudentNo(Long lessonRoundNo, Long teacherNo, Long studentNo);

}
