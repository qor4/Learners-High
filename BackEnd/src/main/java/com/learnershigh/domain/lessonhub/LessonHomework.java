package com.learnershigh.domain.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonHomeworkNotice;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class LessonHomework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_homework_no")
    private Long lessonHomeworkNo;

    // 수업 no
    @ManyToOne
    @JoinColumn(name = "lesson_no")
    private Lesson lessonNo;

    // 수업 회차 no
    @ManyToOne
    @JoinColumn(name = "lesson_round_no")
    private LessonRound lessonRoundNo;

    // 학생 no
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 과제 공지 no
    @ManyToOne
    @JoinColumn(name = "lesson_homework_notice_no")
    private LessonHomeworkNotice lessonHomeworkNoticeNo;

    // 과제 파일명
    @Column(name = "homework_file_name")
    private String homeworkFileName;

    // 과제 원본 파일명
    @Column(name = "homework_file_origin_name")
    private String homeworkFileOriginName;

    // 과제 상태
    @Column(name = "homework_status")
    private String homeworkStatus;

    // 과제 제출 일시
    @Column(name = "homework_submission_datetime")
    private LocalDateTime homeworkSubmissionDatetime;
}
