package com.learnershigh.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginDto {
    private String userId;
    private String userPassword;
}