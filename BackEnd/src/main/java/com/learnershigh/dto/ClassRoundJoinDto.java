package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ClassRoundJoinDto {
    // 수업 no
    private Long classNo;
    // 수업 회차
    private int classRoundNumber;
    // 수업 회차 제목
    private String classRoundTitle;
    // 수업 회차 강의자료 저장 이름
    private String classRoundFileName;
    // 수업 회차 강의자료 원본 이름
    private String classRoundFileOriginName;
    // 수업 회차 시작 일시
    private LocalDateTime classRoundStartDatetime;
    // 수업 회차 종료 일시
    private LocalDateTime classRoundEndDatetime;
    // 수업 회차 과제 유무
    private boolean isHomework;
}
