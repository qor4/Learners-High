package com.learnershigh.repository.user;


import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

// @Repository // jparepository를 확장받으면 repository 작성하지 않아도 됨.
// mybatis할 때 dao역할임. DB랑 대화하는 애

// ---- 방법 1
//@Repository
//@RequiredArgsConstructor
//public class UserRepository { // jparepository 사용시 <Entity 클래스, PK타입>
//
//private final EntityManager em;
//
//// 회원가입
//public void savd(User user){
//    em.persist(user);
//}

// -- 방법 2
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    // 아이디로 user 객체 리턴

    User findByUserId(String userId);

    User findByUserNo(Long userNo);

    User findByUserEmail(String userEmail);

    List<User> findAllByUserNo(Long userNo);

    User findByUserIdAndUserEmail(String userId, String userEmail);


}




