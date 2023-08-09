package com.learnershigh.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobDto {
    private Long jobCareerNo;
    private String companyName;
    private String departName;
    private String hireStartDate;
    private String hireEndDate;
}
