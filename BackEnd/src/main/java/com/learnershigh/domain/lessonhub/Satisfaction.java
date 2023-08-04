package com.learnershigh.domain.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Satisfaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cast_no")
    private int csatNo;

    // 학생 no

    @ManyToOne
    @JoinColumn(name = "student_no")
    private User studentNo;

    // 강사 no

    @ManyToOne
    @JoinColumn(name = "teacher_no")
    private User teacherNo;

    // 수업 회차 no

    @ManyToOne
    @JoinColumn(name = "lesson_round_no")
    private LessonRound lessonRoundNo;

    // 수업 no

    @ManyToOne
    @JoinColumn(name = "lesson_no")
    private Lesson lessonNo;

    // 수업 만족도
    @NotNull
    @Column(name = "lesson_round_csat")
    private float lessonRoundCsat;

    // 강사 만족도
    @NotNull
    @Column(name = "teacher_csat")
    private float teacherCsat;

    // 만족도 생성 일시
    @CreationTimestamp
    @Column(name = "lesson_csat_datetime")
    private LocalDateTime lessonCsatDatetime;


}
