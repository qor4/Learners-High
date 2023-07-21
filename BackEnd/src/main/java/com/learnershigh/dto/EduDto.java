package com.learnershigh.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EduDto {

    private String universityName;
    private String majorName;
    private String degree;

    private String eduStartDate;

    private String eduEndDate;
}
