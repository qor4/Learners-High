package com.learnershigh.dto.lesson;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class LessonInfoDto {
    // 수업 no
    private Long lessonNo;
    // 강사 no
    private Long userNo;
    // 강사 이름
    private String userName;
    // 과목 분류 no
    private int lessonTypeNo;
    // 과목 분류 이름
    private String lessonTypeName;
    // 수업 이름
    private String lessonName;
    // 시작 날짜
    private LocalDate lessonStartDate;
    // 종료 날짜
    private LocalDate lessonEndDate;
    // 수업 정보
    private String lessonInfo;
    // 최대 수강 학생 수
    private int maxStudent;
    // 현재 수강 학생 수
    private int totalStudent;
    // 수업 가격
    private int lessonPrice;
    // 수업 썸네일과 함께 보일 간단한 수업 소개
    private String lessonThumbnailInfo;
    // 수업 상태
    private String lessonStatus;
    // 수업 총 회차
    private int lessonTotalRound;
    // 조회수
    private int lesson_view_count;
}
