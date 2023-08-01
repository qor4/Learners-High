package com.learnershigh.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
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
    @NotNull
    @ManyToOne
    @JoinColumn(name = "student_no")
    private User studentNo;

    // 강사 no
    @NotNull
    @ManyToOne
    @JoinColumn(name = "teacher_no")
    private User teacherNo;

    // 수업 회차 no
    @NotNull
    @ManyToOne
    @JoinColumn(name = "class_round_no")
    private ClassRound classRoundNo;

    // 수업 no
    @NotNull
    @ManyToOne
    @JoinColumn(name = "class_no")
    private Class classNo;

    // 수업 만족도
    @NotNull
    @Column(name = "class_round_csat")
    private float classRoundCsat;

    // 강사 만족도
    @NotNull
    @Column(name = "teacher_csat")
    private float teacherCsat;

    // 만족도 생성 일시
    @CreationTimestamp
//    @NotNull
    @Column(name = "class_csat_datetime")
    private LocalDateTime classCsatDatetime;


}
