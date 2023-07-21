package com.learnershigh.repository;


import com.learnershigh.domain.Class;
import com.learnershigh.dto.ClassListProjectionInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ClassRepository extends JpaRepository<Class, Long> {

    Class findByClassNo(Long classNo);

    @Query(value = "SELECT C.classNo AS classNo, U.userNo AS userNo, U.userName AS userName, CT.classTypeNo AS classTypeNo, CT.classTypeName AS classTypeName, C.className AS className, C.classStartDate AS classStartDate, C.classEndDate AS classEndDate, C.maxStudent AS maxStudent, C.totalStudent AS totalStudent, C.classPrice AS classPrice, C.classThumbnailImg AS classThumbnailImg, C.classStatus AS classStatus FROM Class C JOIN C.userNo U JOIN C.classTypeNo CT WHERE C.classStatus = '강의 전'")
    List<ClassListProjectionInterface> upcomingClassList();
}




