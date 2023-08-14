package com.learnershigh.dto.lessonhub;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveWarningDto {
    private Long lessonNo;
    private Long lessonRoundNo;
    private Long studentNo;
    private String teacherId;
}
