package com.learnershigh.controller;

import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@Api(tags = {"사용자에 대한 API"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/user-join")

    public User userJoin(@RequestBody JoinDto joinDto) {

        return userService.userJoin(joinDto);
    }

    // 경력 추가
    @PostMapping("/job-join")
    public JobCareer jobJoin(@RequestBody JobDto jobDto) {

        return userService.jobJoin(jobDto);
    }

    // 학위 추가
    @PostMapping("/edu-join")
    public EduCareer eduJoin(@RequestBody EduDto eduDto) {

        return userService.eduJoin(eduDto);
    }

    // 로그인
    @PostMapping("/local-login")
//    @ApiOperation(value = "로그인", response = BaseResponseBody.class)
    public ResponseEntity<CustomResponseBody> userLogin(@RequestBody LoginDto loginDto){
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        TokenDto token = userService.userLogin(loginDto);
        responseBody.getList().add(token);
//        return new ResponseEntity<>(userService.userLogin(loginDto), HttpStatus.OK);
        return ResponseEntity.ok().body(responseBody);
    }
}
