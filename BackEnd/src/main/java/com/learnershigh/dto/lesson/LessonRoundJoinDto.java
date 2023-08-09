package com.learnershigh.dto.lesson;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LessonRoundJoinDto {
    // 수업 no
    private Long lessonNo;
    // 수업 회차
    private int lessonRoundNumber;
    // 수업 회차 제목
    private String lessonRoundTitle;
    // 수업 회차 시작 일시
    private LocalDateTime lessonRoundStartDatetime;
    // 수업 회차 종료 일시
    private LocalDateTime lessonRoundEndDatetime;
}
