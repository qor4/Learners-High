package com.learnershigh.domain;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Class {

    // 수업 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_no")
    private Long classNo;

    // 강사 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 과목 분류 (FK)
    @ManyToOne
    @JoinColumn(name = "class_type_no")
    private ClassType classTypeNo;

    // 수업 이름
    @NotNull
    @Column(name = "class_name", length = 100)
    private String className;

    // 시작 날짜
    @Column(name = "class_start_date", columnDefinition = "DATE")
    private LocalDate classStartDate;

    // 종료 날짜
    @Column(name = "class_end_date", columnDefinition = "DATE")
    private LocalDate classEndDate;

    // 수업 정보
    @Column(name = "class_info", columnDefinition = "TEXT")
    private String classInfo;

    // 최대 수강 학생 수
    @NotNull
    @Column(name = "max_student", columnDefinition = "TINYINT")
    private int maxStudent;

    // 현재 수강 학생 수
    @NotNull
    @Column(name = "total_student", columnDefinition = "TINYINT")
    @ColumnDefault("0") //default 0
    private int totalStudent;

    // 수업 가격
    @NotNull
    @Column(name = "class_price", columnDefinition = "MEDIUMINT")
    private int classPrice;

    // 수업 썸네일
    @NotNull
    @Column(name = "class_thumbnail_img")
    private String classThumbnailImg;

    // 수업 썸네일과 함께 보일 간단한 수업 소개
    @Column(length = 300, name = "class_thumbnail_info")
    private String classThumbnailInfo;

    // 수업 상태
    @NotNull
    @Column(name = "class_status")
//    @ColumnDefault("작성 중") //default
    private String classStatus;

    // 수업 등록 일시
    @CreationTimestamp
    @Column(name = "class_join_datetime")
    private LocalDateTime classJoinDatetime;

    // 수업 총 회차
    @Column(name = "class_total_round", columnDefinition = "TINYINT")
    private int classTotalRound;

    // 수업 회차
    @OneToMany(mappedBy = "classNo")
    List<ClassRound> classRoundList = new ArrayList<>();
}