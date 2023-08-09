package com.learnershigh.domain.lesson;

import com.learnershigh.domain.lessonhub.Satisfaction;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class LessonRound {

    // 수업 회차 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_round_no")
    private Long lessonRoundNo;

    // 수업 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "lesson_no")
    private Lesson lessonNo;

    // 수업 회차
    @NotNull
    @Column(name = "lesson_round_number", columnDefinition = "TINYINT")
    private int lessonRoundNumber;

    // 수업 회차 제목
    @NotNull
    @NotBlank
    @Column(name = "lesson_round_title")
    private String lessonRoundTitle;

    // 수업 회차 강의자료 파일명
    @Column(name = "lesson_round_file_name")
    private String lessonRoundFileName;

    // 수업 회차 강의자료 파일 원본 이름
    @Column(name = "lesson_round_file_origin_name")
    private String lessonRoundFileOriginName;

    // 수업 회차 시작 일시
    @NotNull
    @Column(name = "lesson_round_start_datetime", columnDefinition = "DATETIME")
    private LocalDateTime lessonRoundStartDatetime;

    // 수업 회차 종료 일시
    @NotNull
    @Column(name = "lesson_round_end_datetime", columnDefinition = "DATETIME")
    private LocalDateTime lessonRoundEndDatetime;

    // 수업 회차별 수업룸 입장 키
    @Column(name = "lesson_round_lessonroom")
    private String lessonRoundLessonroom;

    // 회차당 만족도가 여러개일수도 있기 때문에 리스트 생성
    @OneToMany(mappedBy = "lessonRoundNo",fetch = FetchType.LAZY)
    List<Satisfaction> roundSatiList = new ArrayList<>();
}