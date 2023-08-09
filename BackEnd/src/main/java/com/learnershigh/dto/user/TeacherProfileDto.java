package com.learnershigh.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TeacherProfileDto {
    // 강사 no
    private Long userNo;
    // 강사 name
    private String userName;
    // 강사 한마디
    private String userInfo;
    // 강사 프로필이미지
    private String profileImg;
    // 학력 dto
    private List<EduDto> eduInfos;
    // 경력 dto
    private List<JobDto> jobInfos;
    
}
