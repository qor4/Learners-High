package com.learnershigh.dto.lesson;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class LessonDetailDto {
    // 수업(수업+강사+수업분류) dto
    private LessonInfoDto lessonInfo;
    // 회차 정보
    private List<LessonRoundDetailDto> lessonRoundInfo;
}
