package com.learnershigh.domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class StudentClassList {

    // 수강 목록 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_class_list_no")
    private Long whshlistNo;

    // 학생 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User userNo;

    // 수업 no (FK,NN)
    @ManyToOne
    @JoinColumn(name = "class_no")
    private Class classNo;

    // 등록 일자
    @CreationTimestamp
    @Column(name = "student_class_list_datetime")
    private LocalDateTime studentClassListDatetime;

}