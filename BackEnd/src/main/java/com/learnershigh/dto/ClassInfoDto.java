package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ClassInfoDto {
    // 수업 no
    private Long classNo;
    // 강사 no
    private Long userNo;
    // 강사 이름
    private String userName;
    // 과목 분류 no
    private int classTypeNo;
    // 과목 분류 이름
    private String classTypeName;
    // 수업 이름
    private String className;
    // 시작 날짜
    private LocalDate classStartDate;
    // 종료 날짜
    private LocalDate classEndDate;
    // 수업 정보
    private String classInfo;
    // 최대 수강 학생 수
    private int maxStudent;
    // 현재 수강 학생 수
    private int totalStudent;
    // 수업 가격
    private int classPrice;
    // 수업 썸네일
    private String classThumbnailImg;
    // 수업 썸네일과 함께 보일 간단한 수업 소개
    private String classThumbnailInfo;
    // 수업 상태
    private String classStatus;
    // 수업 총 회차
    private int classTotalRound;
}
