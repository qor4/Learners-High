package com.learnershigh.dto.etc;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaveAttentionRateDto {
    private Long lessonRoundNo;
    private Long lessonNo;
    private Long userNo;
    private Float rate;
    private int status;
}
