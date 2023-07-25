package com.learnershigh.repository;

import com.learnershigh.domain.StudentClassList;
import com.learnershigh.domain.StudentWishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentClassListRepository extends JpaRepository<StudentClassList, Long> {
    @Query(value = "SELECT wish FROM StudentWishlist wish WHERE wish.userNo.userNo = :userNo AND wish.classNo.classNo = :classNo")
    StudentWishlist findByUserNoAndClassNo(@Param("userNo") Long userNo, @Param("classNo") Long classNo);
}

