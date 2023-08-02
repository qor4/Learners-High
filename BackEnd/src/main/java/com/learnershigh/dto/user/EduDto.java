package com.learnershigh.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EduDto {
    private Long eduCareerNo;
    private String universityName;
    private String majorName;
    private String degree;
    private String eduStartDate;
    private String eduEndDate;
}
