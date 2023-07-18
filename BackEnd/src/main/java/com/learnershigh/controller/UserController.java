package com.learnershigh.controller;

import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.User;
import com.learnershigh.dto.EduDto;
import com.learnershigh.dto.JobDto;
import com.learnershigh.dto.JoinDto;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@Api(tags = {"사용자에 대한 API"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/hello")
    public String hello(){
        return "안녕";
    }
    // 회원가입
    @PostMapping("/userjoin")

    public User userJoin(@RequestBody JoinDto joinDto) {

        return userService.userJoin(joinDto);
    }

    // 경력 추가
    @PostMapping("/jobjoin")
    public JobCareer jobJoin(@RequestBody JobDto jobDto) {

        return userService.jobJoin(jobDto);
    }

    // 학위 추가
    @PostMapping("/edujoin")
    public EduCareer eduJoin(@RequestBody EduDto eduDto) {

        return userService.eduJoin(eduDto);
    }


}
