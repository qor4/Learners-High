package com.learnershigh.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StudentWishlist {

    // 찜 목록 no
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_no")
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
    @Column(name = "wishlist_datetime")
    private LocalDateTime wishlistDatetime;

}