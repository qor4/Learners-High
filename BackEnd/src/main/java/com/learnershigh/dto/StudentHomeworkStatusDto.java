package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentHomeworkStatusDto {
    // 유저 no
    private Long userNo;
    // 유저 이름
    private String userName;
    // 수업 회차 과제 상태
    private String homeworkStatus;
    // 수업 회차 과제 파일 명
    private String homeworkFileName;
    // 수업 회차 과제 원본파일 명
    private String homeworkFileOriginName;

    public StudentHomeworkStatusDto(Long userNo, String userName, String homeworkStatus, String homeworkFileName, String homeworkFileOriginName) {
        this.userNo = userNo;
        this.userName = userName;
        this.homeworkStatus = homeworkStatus;
        this.homeworkFileName = homeworkFileName;
        this.homeworkFileOriginName = homeworkFileOriginName;
    }
}
