package com.learnershigh.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ClassHomework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_no")
    private Long classHomeworkNo;

    // 수업 no
    @ManyToOne
    @JoinColumn(name = "class_no")
    private Class classNo;

    // 수업 회차 no
    @ManyToOne
    @JoinColumn(name = "class_round_no")
    private ClassRound classRoundNo;

    // 학생 no
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 과제 공지 no
    @ManyToOne
    @JoinColumn(name = "class_homework_notice_no")
    private ClassHomeworkNotice classHomeworkNoticeNo;

    // 과제 파일명
    @Column(name = "homework_file_name")
    private String homeworkFileName;

    // 과제 원본 파일명
    @Column(name = "homework_file_origin_name")
    private String homeworkFileOriginName;

    // 과제 상태
    @Column(name = "homework_status")
    private String homeworkStatus;

    // 과제 제출 일시
    @Column(name = "homework_submission_datetime")
    private LocalDateTime homeworkSubmissionDatetime;
}
