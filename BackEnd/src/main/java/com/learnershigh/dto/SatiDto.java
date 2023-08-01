package com.learnershigh.dto;

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

    private Long classRoundNo;

    private Long classNo;

    private int classRoundCsat;

    private int teacherCsat;

}
