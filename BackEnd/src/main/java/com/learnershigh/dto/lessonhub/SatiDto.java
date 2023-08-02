package com.learnershigh.dto.lessonhub;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SatiDto {

    private Long studentNo;

    private Long teacherNo;

    private Long lessonRoundNo;

    private Long lessonNo;

    private int lessonRoundCsat;

    private int teacherCsat;

}
