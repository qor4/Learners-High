package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lesson.LessonHomeworkNotice;
import com.learnershigh.dto.lessonhub.HomeworkNoticeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LessonHomeworkNoticeRepository extends JpaRepository<LessonHomeworkNotice, Long> {

    @Query(value = "SELECT new com.learnershigh.dto.lessonhub.HomeworkNoticeDto(notice.lessonHomeworkNoticeNo, notice.homeworkNoticeTitle, notice.homeworkNoticeContent) " +
            "FROM LessonHomeworkNotice notice " +
            "WHERE notice.lessonRoundNo.lessonRoundNo = :lessonRoundNo")
    HomeworkNoticeDto getHomeworkNoticeByLessonRoundNo(@Param("lessonRoundNo") Long LessonRoundNo);
}

