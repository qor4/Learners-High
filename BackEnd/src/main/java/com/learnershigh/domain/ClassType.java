package com.learnershigh.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_type_no")
    private int classTypeNo;

    @NotNull
    @Column(name = "class_type_name", length = 15)
    private String classTypeName;

    @OneToMany(mappedBy = "classTypeNo")
    List<Class> classList = new ArrayList<>();
}
