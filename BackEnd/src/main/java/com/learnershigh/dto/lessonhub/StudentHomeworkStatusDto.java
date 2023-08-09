package com.learnershigh.dto.lessonhub;

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
    private Long homeworkNo;

    public StudentHomeworkStatusDto(Long userNo, String userName, String homeworkStatus, Long homeworkNo) {
        this.userNo = userNo;
        this.userName = userName;
        this.homeworkStatus = homeworkStatus;
        this.homeworkNo = homeworkNo;
    }
}
