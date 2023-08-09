package com.learnershigh.dto.lessonhub;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentLessonActionDto {
    private Long userNo;
    private Long lessonNo;
}
