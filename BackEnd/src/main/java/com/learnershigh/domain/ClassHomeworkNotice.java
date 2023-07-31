package com.learnershigh.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ClassHomeworkNotice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_homework_notice_no")
    private Long classHomeworkNoticeNo;

    // 수업 회차 no
    @ManyToOne
    @JoinColumn(name = "class_round_no")
    private ClassRound classRoundNo;

    // 과제 공지 제목
    @NotNull
    @Column(name = "homework_notice_title")
    private String homeworkNoticeTitle;

    // 과제 공지 내용
    @Column(name = "homework_notice_content")
    private String homeworkNoticeContent;

    // 과제 공지 등록 시간
    @CreationTimestamp
    @Column(name = "homework_notice_join_datetime")
    private LocalDateTime homeworkNoticeJoinDatetime;
}
