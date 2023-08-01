package com.learnershigh.repository;

import com.learnershigh.domain.ClassHomework;
import com.learnershigh.domain.User;
import com.learnershigh.dto.AttendHomeworkProjectionInterface;
import com.learnershigh.dto.StudentHomeworkStatusDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassHomeworkRepository extends JpaRepository<ClassHomework, Long> {
    //    @Query("SELECT new com.learnershigh.dto.AttendHomeworkDto(homework.classRoundNo.classRoundNo, homework.classRoundNo.classRoundNumber, " +
//            "attend.classAttendStatus, homework.homeworkStatus, homework.homeworkFileName, homework.homeworkFileOriginName) " +
//            "FROM ClassHomework homework RIGHT JOIN ClassAttend attend ON homework.classRoundNo = attend.classRoundNo " +
//            "WHERE attend.classNo.classNo = :classNo AND attend.userNo.userNo = :userNo")
    @Query(value = "SELECT a.class_round_no AS classRoundNo, " +
            "a.class_attend_status AS classAttendStatus, h.homework_status AS homeworkStatus, " +
            "h.homework_file_name AS homeworkFileName, h.homework_file_origin_name AS homeworkFileOriginName " +
            "FROM class_homework h RIGHT JOIN class_attend a ON h.class_round_no = a.class_round_no " +
            "where a.class_no = :classNo and a.user_no = :userNo", nativeQuery = true)
    List<AttendHomeworkProjectionInterface> getAttendHomeworkByUserNo(@Param("userNo") Long userNo, @Param("classNo") Long classNo);

    @Query(value = "SELECT new com.learnershigh.dto.StudentHomeworkStatusDto(homework.userNo.userNo, homework.userNo.userName, homework.homeworkStatus, homework.homeworkFileName, homework.homeworkFileOriginName) " +
            "FROM ClassHomework homework " +
            "WHERE homework.classHomeworkNoticeNo.classHomeworkNoticeNo = :classHomeworkNoticeNo " +
            "AND homework.userNo = :userNo")
    StudentHomeworkStatusDto getStudentHomeworkStatusByHomeworkNoticeNo(@Param("classHomeworkNoticeNo") Long classHomeworkNoticeNo, @Param("userNo") User userNo);
}

