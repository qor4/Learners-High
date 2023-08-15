package com.learnershigh.domain.user;

import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.lessonhub.StudentWishlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    // user_no, PK값
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_no")
    private Long userNo;

    // user id
    @NotNull
    @NotBlank
    @Column(name = "user_id", length = 20)
    private String userId;

    //user name
    @NotNull
    @NotBlank
    @Column(name = "user_name", length = 20)
    private String userName;

    // user email
    @NotNull
    @NotBlank
    @Column(name = "user_email", length = 50)
    private String userEmail;

    // user password

    @Column(name = "user_password", length = 60)
    private String userPassword;

    // user tel

    @Column(name = "user_tel", length = 20)
    private String userTel;

    // user info
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
    @Column(name = "is_active", nullable = true)
    private boolean isActive;

    @Column(length = 1, name = "how_join", nullable = false)
    private String howJoin;

    @PrePersist
    public void setIsActive() {
        this.isActive = true;
    }

//    // refresh token 사용자 refreshToken
//    @Column(name = "refresh_token")
//    private String refreshToken;

    // 강사 한명당 학위 여러개일수도 있기때문에 리스트 생성
    @OneToMany(mappedBy = "userNo", fetch = FetchType.LAZY)
    List<EduCareer> eduList = new ArrayList<>();

    // 강사 한명당 경력 여러개일수도 있기때문에 리스트 생성
    @OneToMany(mappedBy = "userNo", fetch = FetchType.LAZY)
    List<JobCareer> jobList = new ArrayList<>();

    // 학생 한명당 위시 리스트가 여러개일수도 있기 때문에 리스트 생성
    @OneToMany(mappedBy = "userNo", fetch = FetchType.LAZY)
    List<StudentWishlist> studentWishlist = new ArrayList<>();

    // 학생 한명당 만족도가 여러개일수도 있기 때문에 리스트 생성
    @OneToMany(mappedBy = "studentNo",fetch = FetchType.LAZY)
    List<Satisfaction> studentSatiList = new ArrayList<>();

    // 강사 한명당 만족도가 여러개일수도 있기 때문에 리스트 생성
    @OneToMany(mappedBy = "teacherNo",fetch = FetchType.LAZY)
    List<Satisfaction> teacherSatiList = new ArrayList<>();

    public void mypageModify(String userName, String userTel, String userInfo) // 프로필??
    {
        this.userName = userName;
        this.userTel = userTel;
        this.userInfo = userInfo;
    }



    public void userDelete(Boolean isActive){
        this.isActive = isActive;
    }

}
