package com.learnershigh;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class LessonSpecification {

    public static Specification<User> equalUserNameandSearchWord(String searchWord) {
       return new Specification<User>() {
           @Override
           public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
               return criteriaBuilder.like(root.get("userName"), "%" + searchWord + "%");
           }
       };
    }

    public static Specification<Lesson> equallessonNameandSearchWord(String searchWord) {
        return new Specification<Lesson>() {
            @Override
            public Predicate toPredicate(Root<Lesson> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("lessonName"), "%" + searchWord + "%");

            }
        };
    }



}