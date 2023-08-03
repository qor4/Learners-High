package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.LessonHomework;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lessonhub.AttendHomeworkProjectionInterface;
import com.learnershigh.dto.lessonhub.StudentHomeworkStatusDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonHomeworkRepository extends JpaRepository<LessonHomework, Long> {
    //    @Query("SELECT new com.learnershigh.dto.AttendHomeworkDto(homework.lessonRoundNo.lessonRoundNo, homework.lessonRoundNo.lessonRoundNumber, " +
//            "attend.lessonAttendStatus, homework.homeworkStatus, homework.homeworkFileName, homework.homeworkFileOriginName) " +
//            "FROM LessonHomework homework RIGHT JOIN LessonAttend attend ON homework.lessonRoundNo = attend.lessonRoundNo " +
//            "WHERE attend.lessonNo.lessonNo = :lessonNo AND attend.userNo.userNo = :userNo")
    @Query(value = "SELECT a.lesson_round_no AS lessonRoundNo, " +
            "a.lesson_attend_status AS lessonAttendStatus, h.homework_status AS homeworkStatus, " +
            "h.lesson_homework_no AS homeworkNo " +
            "FROM lesson_homework h RIGHT JOIN lesson_attend a ON h.lesson_round_no = a.lesson_round_no " +
            "where a.lesson_no = :lessonNo and a.user_no = :userNo", nativeQuery = true)
    List<AttendHomeworkProjectionInterface> getAttendHomeworkByUserNo(@Param("userNo") Long userNo, @Param("lessonNo") Long lessonNo);

    @Query(value = "SELECT new com.learnershigh.dto.lessonhub.StudentHomeworkStatusDto(homework.userNo.userNo, homework.userNo.userName, homework.homeworkStatus, homework.lessonHomeworkNo) " +
            "FROM LessonHomework homework " +
            "WHERE homework.lessonHomeworkNoticeNo.lessonHomeworkNoticeNo = :lessonHomeworkNoticeNo " +
            "AND homework.userNo = :userNo")
    StudentHomeworkStatusDto getStudentHomeworkStatusByHomeworkNoticeNo(@Param("lessonHomeworkNoticeNo") Long lessonHomeworkNoticeNo, @Param("userNo") User userNo);

    LessonHomework findByLessonHomeworkNo(Long lessonHomeworkNo);

//    LessonHomework findByUserNoAndAndLessonRoundNo(Long userNo, Long lessonRoundNo);


}

