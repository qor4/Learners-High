package com.learnershigh.domain.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class LessonAttend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_attend_no")
    private Long lessonAttendNo;

    @ManyToOne
    @JoinColumn(name = "lesson_no")
    private Lesson lessonNo;

    @ManyToOne
    @JoinColumn(name = "lesson_round_no")
    private LessonRound lessonRoundNo;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    @NotNull
    @NotBlank
    @Column(name = "lesson_attend_status")
    private String lessonAttendStatus;

    @Column(name = "lesson_attend_datetime")
    private LocalDateTime lessonAttendDatetime;

}
