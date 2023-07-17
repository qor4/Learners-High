package com.learnershigh.controller;


import com.learnershigh.domain.User;
import com.learnershigh.dto.JoinDto;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Api(tags = {"사용자에 대한 API"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/userjoin")
    @ApiOperation(value = "회원가입", response = User.class)
    public User userjoin(@RequestBody JoinDto joindto){

        // 아이디

        // 이름

        // 이메일

        // 비밀번호

        // 전화번호

        // 한마디

        // 가입 일시

        // 학사 강사 구분



        // 중복이 안되면 insert 할 수 있게 해야 함.

        return userService.userjoin(joindto);
    }

     // 경력 추가
//    @PostMapping("/jobjoin")
//    public EduCareer jobjoin(@RequestBody EduDto eduDto){
//        return userService.
//    }

    // 학위 추가






}
