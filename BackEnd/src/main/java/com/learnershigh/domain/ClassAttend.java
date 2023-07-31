package com.learnershigh.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ClassAttend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_attend_no")
    private Long classAttendNo;

    @ManyToOne
    @JoinColumn(name = "class_no")
    private Class classNo;

    @ManyToOne
    @JoinColumn(name = "class_round_no")
    private ClassRound classRoundNo;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    @NotNull
    @Column(name = "class_attend_status")
    private String classAttendStatus;

    @Column(name = "class_attend_datetime")
    private LocalDateTime classAttendDatetime;

}
