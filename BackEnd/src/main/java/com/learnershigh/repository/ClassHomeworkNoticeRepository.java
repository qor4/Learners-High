package com.learnershigh.repository;

import com.learnershigh.domain.ClassHomeworkNotice;
import com.learnershigh.dto.HomeworkNoticeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClassHomeworkNoticeRepository extends JpaRepository<ClassHomeworkNotice, Long> {

    @Query(value = "SELECT new com.learnershigh.dto.HomeworkNoticeDto(notice.classHomeworkNoticeNo, notice.homeworkNoticeTitle, notice.homeworkNoticeContent) " +
            "FROM ClassHomeworkNotice notice " +
            "WHERE notice.classRoundNo.classRoundNo = :classRoundNo")
    HomeworkNoticeDto getHomeworkNoticeByClassRoundNo(@Param("classRoundNo") Long ClassRoundNo);
}

