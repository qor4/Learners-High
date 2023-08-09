package com.learnershigh.dto.lessonhub;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LessonRoundHomeworkStatusDto {
    // 수업 회차 no
    private Long lessonRoundNo;
    // 수업 회차 number
    private Integer lessonRoundNumber;
    // 수업 회차 별 과제 공지 정보
    private HomeworkNoticeDto homeworkNotice;
    // 수업 회차 별 학생 과제 정보
    private List<StudentHomeworkStatusDto> studentHomeworkStatusList;

}
