package com.learnershigh.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
public class ClassRound {

    // 수업 회차 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_round_no")
    private Long classRoundNo;

    // 수업 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "class_no")
    private Class classNo;

    // 수업 회차
    @NotNull
    @Column(name = "class_round_number", columnDefinition = "TINYINT")
    private int classRoundNumber;

    // 수업 회차 제목
    @NotNull
    @Column(name = "class_round_title")
    private String classRoundTitle;

    // 수업 회차 강의자료 파일명
    @Column(name = "class_round_file_name")
    private String classRoundFileName;

    // 수업 회차 강의자료 파일 원본 이름
    @Column(name = "class_round_file_origin_name")
    private String classRoundFileOriginName;

    // 수업 회차 시작 일시
    @NotNull
    @Column(name = "class_round_start_datetime", columnDefinition = "DATETIME")
    private LocalDateTime classRoundStartDatetime;

    // 수업 회차 종료 일시
    @NotNull
    @Column(name = "class_round_end_datetime", columnDefinition = "DATETIME")
    private LocalDateTime classRoundEndDatetime;

    // 수업 회차 과제 유무
    @NotNull
    @Column(name = "is_homework")
    private boolean isHomework;

    // 수업 회차별 수업룸 입장 키
    @Column(name = "class_round_classroom")
    private String classRoundClassroom;
}