package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ClassRoundDetailDto {
    // 수업 회차 no
    private Long classRoundNo;
    // 수업 회차
    private int classRoundNumber;
    // 수업 회차 제목
    private String classRoundTitle;
    // 수업 회차 시작 일시
    private LocalDateTime classRoundStartDatetime;
    // 수업 회차 종료 일시
    private LocalDateTime classRoundEndDatetime;
}
