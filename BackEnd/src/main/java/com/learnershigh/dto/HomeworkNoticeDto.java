package com.learnershigh.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HomeworkNoticeDto {
    // 과제 공지 no
    private Long classHomeworkNoticeNo;
    // 과제 공지 제목
    private String homeworkNoticeTitle;
    // 과제 공지 내용
    private String homeworkNoticeContent;

    public HomeworkNoticeDto(Long classHomeworkNoticeNo, String homeworkNoticeTitle, String homeworkNoticeContent) {
        this.classHomeworkNoticeNo = classHomeworkNoticeNo;
        this.homeworkNoticeTitle = homeworkNoticeTitle;
        this.homeworkNoticeContent = homeworkNoticeContent;
    }
}
