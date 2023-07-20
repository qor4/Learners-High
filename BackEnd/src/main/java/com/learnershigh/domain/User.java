package com.learnershigh.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class User {

    // user_no, PK값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    // user id
    @NotNull
    @Column(name = "user_id", length = 20)
    private String userId;

    //user name
    @NotNull
    @Column(name = "user_name", length = 20)
    private String userName;

    // user email
    @NotNull
    @Column(name = "user_email", length = 50)
    private String userEmail;

    // user password
    @NotNull
    @Column(name = "user_password", length = 60)
    private String userPassword;

    // user tel
    @NotNull
    @Column(name = "user_tel", length = 20)
    private String userTel;

    // user info
    @NotNull
    @Column(name = "user_info", length = 30)
    private String userInfo;

    // user date (가입 시간)
//    @NotNull
    @CreationTimestamp
    @Column(name = "user_join_date")
    private LocalDateTime userJoinDate;

    // user img (유저 프로필 사진)
    @Column(length = 1000, name = "profile_img")
    private String profileImg;

    // user type 학사 강사 구분
    @Column(length = 1, name = "user_type")
    private String userType;


    // is active 탈퇴 여부
    @Column(name = "is_active")
    private boolean isActive;

//    // refresh token 사용자 refreshToken
//    @Column(name = "refresh_token")
//    private String refreshToken;

    // 강사 한명당 수업 여러개일수도 있기때문에 리스트 생성
//    @OneToMany(mappedBy = "userNo")
//    List<Class> classList = new ArrayList<>();


}
