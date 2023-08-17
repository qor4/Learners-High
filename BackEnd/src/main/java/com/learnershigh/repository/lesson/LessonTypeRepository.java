package com.learnershigh.repository.lesson;


import com.learnershigh.domain.lesson.LessonType;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonTypeRepository extends JpaRepository<LessonType, Integer> {
    LessonType findByLessonTypeNo(int lessonTypeNo);



}




