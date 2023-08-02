package com.learnershigh.repository.lesson;

import com.learnershigh.domain.lesson.LessonRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRoundRepository extends JpaRepository<LessonRound, Long> {
    @Query(value = "SELECT CR FROM LessonRound CR WHERE CR.lessonNo.lessonNo = :lessonNo ORDER BY CR.lessonRoundNumber ASC")
    List<LessonRound> findByLessonNo(@Param("lessonNo") Long lessonNo);

    LessonRound findByLessonRoundNo(Long lessonRoundNo);

    @Query(value = "SELECT cr FROM LessonRound cr JOIN StudentLessonList scl ON scl.lessonNo.lessonNo = cr.lessonNo.lessonNo WHERE scl.userNo.userNo = :userNo " +
            "AND date(cr.lessonRoundStartDatetime) = subdate(curdate(),date_format(curdate(),'%w')- :n)")
    List<LessonRound> getWeeklyLessonRoundByStudent(@Param("userNo") Long userNo, @Param("n") String n);

    @Query(value = "SELECT cr FROM LessonRound cr JOIN Lesson c ON c.lessonNo = cr.lessonNo.lessonNo WHERE c.userNo.userNo = :userNo " +
            "AND date(cr.lessonRoundStartDatetime) = subdate(curdate(),date_format(curdate(),'%w')- :n)")
    List<LessonRound> getWeeklyLessonRoundByTeacher(@Param("userNo") Long userNo, @Param("n") String n);
}



