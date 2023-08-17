package com.learnershigh.repository.lesson;


import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import java.util.List;


public interface LessonRepository extends JpaRepository<Lesson, Long>, JpaSpecificationExecutor<Lesson> {

    Lesson findByLessonNo(Long lessonNo);

    Lesson findByLessonNo(Lesson lessonNo);

    List<Lesson> findByUserNo(User userNo);

    @Query(value = "SELECT lesson FROM Lesson lesson WHERE lesson.userNo.userNo = :userNo AND lesson.lessonStatus != '작성 중' " +
            "ORDER BY lesson.lessonStartDate ASC")

    List<Lesson> findByUserNoOrderByLessonStartDateAsc(Long userNo);

    @Query(value = "SELECT lesson FROM Lesson lesson WHERE lesson.userNo.userNo = :userNo AND lesson.lessonStatus = :status " +
            "ORDER BY lesson.lessonStartDate ASC")
    List<Lesson> teacherLessonListStart(@Param("userNo") Long userNo, @Param("status") String status);

    @Query(value = "SELECT lesson FROM Lesson lesson WHERE lesson.userNo.userNo = :userNo AND lesson.lessonStatus = :status " +
            "ORDER BY lesson.lessonEndDate DESC")
    List<Lesson> teacherLessonListEnd(@Param("userNo") Long userNo, @Param("status") String status);

    @Query(value = "SELECT C FROM Lesson C WHERE C.lessonStatus = '강의 전' ORDER BY C.lessonNo DESC")
    List<Lesson> findByUpcomingLesson();

    @Query(value = "SELECT C FROM Lesson C WHERE C.lessonStatus = '작성 중' AND C.userNo.userNo = :userNo")
    Lesson isWritingByUserNo(@Param("userNo") Long userNo);

    List<Lesson> findTop4ByOrderByLessonViewCountDesc();

    Lesson findByLessonNoAndUserNo(Long lessonNo, User userNo);


    @Query(value = "SELECT C.lessonInfo FROM Lesson C WHERE C.lessonNo = :lessonNo")
    String getInfoTab(@Param("lessonNo") Long lessonNo);

}




