package com.learnershigh.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EduCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "edu_career_no")
    private Long eduCareerNo;

    // 사용자 userno랑 단방향 매핑하기
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 대학교(원)
    @NotNull
    @NotBlank
    @Column(name = "university_name", length = 20)
    private String universityName;

    // 전공명
    @NotNull
    @NotBlank
    @Column(name = "major_name", length = 20)
    private String majorName;

    // 학위 종류
    @NotNull
    @NotBlank
    @Column(length = 10)
    private String degree;

    // 입학일
    @NotNull
    @NotBlank
    @Column(name = "edu_start_date", length = 7)
    private String eduStartDate;

    // 졸업일
    @NotNull
    @NotBlank
    @Column(name = "edu_end_date", length = 7)
    private String eduEndDate;

    public void eduModify(String universityName, String majorName, String degree, String eduStartDate, String eduEndDate) //
    {
       this.universityName = universityName;
       this.majorName = majorName;
       this.degree = degree;
       this.eduStartDate = eduStartDate;
       this.eduEndDate = eduEndDate;
    }
}
