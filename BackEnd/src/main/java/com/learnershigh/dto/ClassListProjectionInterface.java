package com.learnershigh.dto;

import java.time.LocalDate;


public interface ClassListProjectionInterface {
    // 수업 no
    Long getClassNo();

    // 강사 no
    Long getUserNo();

    // 강사 이름
    String getUserName();

    // 과목 분류 no
    Integer getClassTypeNo();

    // 과목 이름
    String getClassTypeName();

    // 수업 이름
    String getClassName();

    // 시작 날짜
    LocalDate getClassStartDate();

    // 종료 날짜
    LocalDate getClassEndDate();

    // 최대 수강 학생 수
    Integer getMaxStudent();

    // 현재 수강 학생 수
    Integer getTotalStudent();

    // 수업 가격
    Integer getClassPrice();

    // 수업 썸네일
    String getClassThumbnailImg();

    // 현재 진행 상태
    String getClassStatus();
}
