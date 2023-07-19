package com.learnershigh.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ClassType {

    @Id
    @GeneratedValue
    @Column(name = "class_type_no")
    private int classTypeNo;

    @NotNull
    @Column(name = "class_type_name", length = 15)
    private String classTypeName;

    @OneToMany(mappedBy = "classTypeNo")
    List<Class> classList = new ArrayList<>();
}
