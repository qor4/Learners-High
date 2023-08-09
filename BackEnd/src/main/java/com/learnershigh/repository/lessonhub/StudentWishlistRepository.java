package com.learnershigh.repository.lessonhub;

import com.learnershigh.domain.lessonhub.StudentWishlist;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentWishlistRepository extends JpaRepository<StudentWishlist, Long> {
    @Query(value = "SELECT wish FROM StudentWishlist wish WHERE wish.userNo.userNo = :userNo AND wish.lessonNo.lessonNo = :lessonNo")
    StudentWishlist findByUserNoAndLessonNo(@Param("userNo") Long userNo, @Param("lessonNo") Long lessonNo);

    List<StudentWishlist> findAllByUserNo(User userNo);
}




