package com.learnershigh.domain.lesson;

import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Lesson {

    // 수업 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_no")
    private Long lessonNo;

    // 강사 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 과목 분류 (FK)
    @ManyToOne
    @JoinColumn(name = "lesson_type_no")
    private LessonType lessonTypeNo;

    // 수업 이름
    @NotNull
    @NotBlank
    @Column(name = "lesson_name", length = 100)
    private String lessonName;

    // 시작 날짜
    @Column(name = "lesson_start_date", columnDefinition = "DATE")
    private LocalDate lessonStartDate;

    // 종료 날짜
    @Column(name = "lesson_end_date", columnDefinition = "DATE")
    private LocalDate lessonEndDate;

    // 수업 정보
    @Column(name = "lesson_info", columnDefinition = "TEXT")
    private String lessonInfo;

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
    @Column(name = "lesson_price", columnDefinition = "MEDIUMINT")
    private int lessonPrice;

    // 수업 썸네일
    @Column(name = "lesson_thumbnail_img")
    private String lessonThumbnailImg;

    // 수업 썸네일과 함께 보일 간단한 수업 소개
    @Column(length = 300, name = "lesson_thumbnail_info")
    private String lessonThumbnailInfo;

    // 수업 상태
    @NotNull
    @NotBlank
    @Column(name = "lesson_status")
    private String lessonStatus;

    // 수업 등록 일시
    @CreationTimestamp
    @Column(name = "lesson_join_datetime")
    private LocalDateTime lessonJoinDatetime;

    // 수업 총 회차
    @Column(name = "lesson_total_round", columnDefinition = "TINYINT")
    private int lessonTotalRound;

    // 수업 회차
    @OneToMany(mappedBy = "lessonNo")
    List<LessonRound> lessonRoundList = new ArrayList<>();

    // 조회수
    @Column(name = "lesson_view_count")
    @ColumnDefault("0")
    private int lessonViewCount;

    // 수업 한개당 만족도가 여러개일수도 있기 때문에 리스트 생성
    @OneToMany(mappedBy = "lessonNo",fetch = FetchType.LAZY)
    List<Satisfaction> lessonSatiList = new ArrayList<>();

}