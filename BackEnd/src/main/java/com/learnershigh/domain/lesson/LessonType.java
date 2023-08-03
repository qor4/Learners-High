package com.learnershigh.domain.lesson;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class LessonType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_type_no")
    private int lessonTypeNo;

    @NotNull
    @NotBlank
    @Column(name = "lesson_type_name", length = 15)
    private String lessonTypeName;

    @OneToMany(mappedBy = "lessonTypeNo")
    List<Lesson> lessonList = new ArrayList<>();
}
