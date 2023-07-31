package com.learnershigh.repository;

import com.learnershigh.domain.ClassRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassRoundRepository extends JpaRepository<ClassRound, Long> {
    @Query(value = "SELECT CR FROM ClassRound CR WHERE CR.classNo.classNo = :classNo")
    List<ClassRound> findByClassNo(@Param("classNo") Long classNo);

    ClassRound findByClassRoundNo(Long classRoundNo);

    @Query(value = "SELECT cr FROM ClassRound cr JOIN StudentClassList scl ON scl.classNo.classNo = cr.classNo.classNo WHERE scl.userNo.userNo = :userNo " +
            "AND date(cr.classRoundStartDatetime) = subdate(curdate(),date_format(curdate(),'%w')- :n)")
    List<ClassRound> getWeeklyClassRoundByStudent(@Param("userNo") Long userNo, @Param("n") String n);

    @Query(value = "SELECT cr FROM ClassRound cr JOIN Class c ON c.classNo = cr.classNo.classNo WHERE c.userNo.userNo = :userNo " +
            "AND date(cr.classRoundStartDatetime) = subdate(curdate(),date_format(curdate(),'%w')- :n)")
    List<ClassRound> getWeeklyClassRoundByTeacher(@Param("userNo") Long userNo, @Param("n") String n);
}




