package com.learnershigh.domain.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Warning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warning_no")
    private Long warningNo;

    @ManyToOne
    @JoinColumn(name = "lesson_no")
    private Lesson lessonNo;

    @ManyToOne
    @JoinColumn(name = "lesson_round_no")
    private LessonRound lessonRoundNo;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    @CreationTimestamp
    @Column(name = "warning_datetime")
    private LocalDateTime warningDatetime;

}
