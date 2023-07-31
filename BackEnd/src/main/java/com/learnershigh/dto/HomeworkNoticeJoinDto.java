package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HomeworkNoticeJoinDto {
    // 유저 no
    private Long userNo;
    // 수업 no
    private Long classNo;
    // 수업 회차 no
    private Long classRoundNo;
    // 과제 공지 제목
    private String homeworkNoticeTitle;
    // 과제 공지 내용
    private String homeworkNoticeContent;
}
