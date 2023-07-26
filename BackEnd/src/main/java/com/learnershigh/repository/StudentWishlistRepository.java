package com.learnershigh.repository;

import com.learnershigh.domain.StudentWishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentWishlistRepository extends JpaRepository<StudentWishlist, Long> {
    @Query(value = "SELECT wish FROM StudentWishlist wish WHERE wish.userNo.userNo = :userNo AND wish.classNo.classNo = :classNo")
    StudentWishlist findByUserNoAndClassNo(@Param("userNo") Long userNo, @Param("classNo") Long classNo);

    List<StudentWishlist> findByUserNo(Long userNo);
}




