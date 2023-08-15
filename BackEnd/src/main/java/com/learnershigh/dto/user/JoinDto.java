package com.learnershigh.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JoinDto {
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userTel;
    private String userInfo;
    private String profileImg;
    private String userType;
    private String howJoin;

}
