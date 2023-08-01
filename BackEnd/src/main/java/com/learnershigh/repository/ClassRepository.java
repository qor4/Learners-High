package com.learnershigh.repository;


import com.learnershigh.domain.Class;
import com.learnershigh.domain.User;
import com.learnershigh.dto.ClassListDto;
import com.learnershigh.dto.ClassListProjectionInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ClassRepository extends JpaRepository<Class, Long> {

    Class findByClassNo(Long classNo);

    Class findByClassNo(Class classNo);

    List<Class> findByUserNo(User userNo);

    @Query(value = "SELECT C FROM Class C WHERE C.userNo.userNo = :userNo AND C.classStatus = :status")
    List<Class> teacherClassList(@Param("userNo") Long userNo, @Param("status") String status);

    @Query(value = "SELECT C FROM Class C WHERE C.classStatus = '강의 전'")
    List<Class> findByUpcomingClass();

    @Query(value = "SELECT C FROM Class C WHERE C.classStatus = '작성 중' AND C.userNo.userNo = :userNo")
    Class isWritingByUserNo(@Param("userNo") Long userNo);

    List<Class> findTop5ByOrderByClassViewCountDesc();

    Class findByClassNoAndUserNo(Long classNo, User userNo);


    @Query(value = "SELECT C.classInfo FROM Class C WHERE C.classNo = :classNo")
    String getInfoTab(@Param("classNo") Long classNo);
}




