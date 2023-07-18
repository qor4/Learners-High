package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobDto {

    private String companyName;
    private String departName;

    private String hireStartDate;

    private String hireEndDate;
}
