package com.learnershigh.dto.lessonhub;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HomeworkNoticeDto {
    // 과제 공지 no
    private Long lessonHomeworkNoticeNo;
    // 과제 공지 제목
    private String homeworkNoticeTitle;
    // 과제 공지 내용
    private String homeworkNoticeContent;

    public HomeworkNoticeDto(Long lessonHomeworkNoticeNo, String homeworkNoticeTitle, String homeworkNoticeContent) {
        this.lessonHomeworkNoticeNo = lessonHomeworkNoticeNo;
        this.homeworkNoticeTitle = homeworkNoticeTitle;
        this.homeworkNoticeContent = homeworkNoticeContent;
    }
}
