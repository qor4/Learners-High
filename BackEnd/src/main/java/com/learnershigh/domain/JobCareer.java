package com.learnershigh.domain;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
public class JobCareer {

    // 경력 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_career_no")
    private Long jobCareerNo;

    // 사용자 user_no랑 단방향 매핑
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 회사명
    @NotNull
    @Column(name = "company_name", length = 20)
    private String companyName;

    // 회사 소속 부서
    @NotNull
    @Column(name = "depart_name", length = 20)
    private String departName;

    // 입사일
    @NotNull
    @Column(name = "hire_start_date", length = 7)
    private String hireStartDate;

    // 퇴사일
    @NotNull
    @Column(name = "hire_end_date", length = 7)
    private String hireEndDate;

    public void jobModify(String companyName, String departName, String hireStartDate, String hireEndDate) //
    {
       this.companyName = companyName;
       this.departName = departName;
       this.hireStartDate = hireStartDate;
       this.hireEndDate = hireEndDate;
    }
}
