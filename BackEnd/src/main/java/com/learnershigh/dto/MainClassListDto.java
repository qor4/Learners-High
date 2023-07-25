package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MainClassListDto {
    // 수업 회차 no
    private Long classRoundNo;

    // 수업 no
    private Long classNo;

    // 강사 no
    private Long userNo;

    // 강사 이름
    private String userName;

    // 수업 이름
    private String className;

    // 수업 회차
    private int classRoundNumber;

    // 수업 회차 제목
    private String classRoundTitle;

    // 수업 회차 강의자료 파일명
    private String classRoundFileName;

    // 수업 회차 강의자료 파일 원본 이름
    private String classRoundFileOriginName;

    // 수업 회차 시작 일시
    private LocalDateTime classRoundStartDatetime;

    // 수업 회차 종료 일시
    private LocalDateTime classRoundEndDatetime;

    // 수업 회차 과제 유무
    private boolean isHomework;

    // 수업 회차별 수업룸 입장 키
    private String classRoundClassroom;
}
