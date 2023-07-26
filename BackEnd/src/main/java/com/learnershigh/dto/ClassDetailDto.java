package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ClassDetailDto {
    // 수업(수업+강사+수업분류) dto
    private ClassInfoDto classInfo;
    // 학력 dto
    private List<EduDto> eduInfos;
    // 경력 dto
    private List<JobDto> jobInfos;
    // 회차 정보
    private List<ClassRoundDetailDto> classRoundInfo;
}
