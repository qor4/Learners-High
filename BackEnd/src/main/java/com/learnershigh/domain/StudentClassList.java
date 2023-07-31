package com.learnershigh.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StudentClassList {

    // 수강 목록 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_class_list_no")
    private Long studentClassListNo;

    // 학생 no (FK,NN)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User userNo;

    // 수업 no (FK,NN)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_no")
    private Class classNo;

    // 등록 일자
    @CreationTimestamp
    @Column(name = "student_class_list_datetime")
    private LocalDateTime studentClassListDatetime;

}