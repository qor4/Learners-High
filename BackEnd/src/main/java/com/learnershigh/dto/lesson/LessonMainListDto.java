package com.learnershigh.dto.lesson;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LessonMainListDto {
    // 수업 회차 no
    private Long lessonRoundNo;

    // 수업 no
    private Long lessonNo;

    // 강사 no
    private Long userNo;

    // 강사 이름
    private String userName;

    // 수업 이름
    private String lessonName;

    // 수업 회차
    private int lessonRoundNumber;

    // 수업 회차 제목
    private String lessonRoundTitle;

    // 수업 회차 시작 일시
    private LocalDateTime lessonRoundStartDatetime;

    // 수업 회차 종료 일시
    private LocalDateTime lessonRoundEndDatetime;

    // 수업 회차 과제 유무
    private boolean isHomework;

    // 수업 회차별 수업룸 입장 키
    private String lessonRoundLessonroom;
}
