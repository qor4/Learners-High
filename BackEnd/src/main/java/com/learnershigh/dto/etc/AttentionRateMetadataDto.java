package com.learnershigh.dto.etc;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AttentionRateMetadataDto {
    private Long lessonRoundNo;
    private Long lessonNo;
    private Long userNo;
    private int status;
}
