package com.learnershigh.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
public class EduCareer {

    @Id @GeneratedValue
    @Column(name = "edu_career_no")
    private Long eduCareerNo;

    // 사용자 userno랑 단방향 매핑하기
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 대학교(원)
    @NotNull
    @Column(name = "university_name",length = 20)
    private String universityName;

    // 전공명
    @NotNull
    @Column(name = "major_name",length = 20)
    private String majorName;

    // 학위 종류
    @NotNull
    @Column(length = 10)
    private String degree;

    // 입학일
    @NotNull
    @Column(name = "edu_start_date", length = 7)
    private String eduStartDate;

    // 졸업일
    @NotNull
    @Column(name = "edu_end_date", length = 7)
    private String eduEndDate;
}
