package com.learnershigh.dto.lesson;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class LessonListDto {
    // 수업 no
    private Long lessonNo;

    // 강사 no
    private Long userNo;

    // 강사 이름
    private String userName;

    // 과목 분류 no
    private int lessonTypeNo;

    // 과목 이름
    private String lessonTypeName;

    // 수업 이름
    private String lessonName;

    // 시작 날짜
    private LocalDate lessonStartDate;

    // 종료 날짜
    private LocalDate lessonEndDate;

    // 최대 수강 학생 수
    private int maxStudent;

    // 현재 수강 학생 수
    private int totalStudent;

    // 수업 가격
    private int lessonPrice;

    // 현재 진행 상태
    private String lessonStatus;

    // 조회수
    private int viewCount;
}
