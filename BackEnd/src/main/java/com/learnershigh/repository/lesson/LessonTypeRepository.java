package com.learnershigh.repository.lesson;


import com.learnershigh.domain.lesson.LessonType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonTypeRepository extends JpaRepository<LessonType, Integer> {
    LessonType findByLessonTypeNo(int lessonTypeNo);
}




