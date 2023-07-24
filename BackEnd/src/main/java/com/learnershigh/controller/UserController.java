package com.learnershigh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.OAuthToken;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;


@RestController
@RequestMapping("/user")
@Api(tags = {"사용자에 대한 API"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @GetMapping("/test")
//    @ResponseBody
//    public String index(){
//        return /;
//    }

//        @GetMapping("/test")
//        @ResponseBody
//    public ModelAndView index() throws IOException {
//        // ~ 코드 생략
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("kakaologin");
//        modelAndView.addObject("response", "suceess");
//
//        return modelAndView;
//    }

    // 회원가입
    @PostMapping("/user-join")
    public User userJoin(@RequestBody JoinDto joinDto) {

        return userService.userJoin(joinDto);

        // true 면 가입 한 적 없음.
        // false 면 가입 한 적 있음.
    }

    // 아이디 중복
    @GetMapping("/join-id-duplicate/{id}")
    public ResponseEntity<BaseResponseBody> duplicateId(@PathVariable("id") String userId) {
        BaseResponseBody baseResponseBody = new BaseResponseBody();
        if (userService.duplicateId(userId)) {
            baseResponseBody.setResultMsg("사용 할 수 있는 아이디 입니다.");
        } else {

            baseResponseBody.setResultMsg("사용 할 수 없는 아이디 입니다.(중복된 아이디)");
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }

    // 이메일 중복
    @GetMapping("/join-email-duplicate/{email}")
    public ResponseEntity<BaseResponseBody> duplicateEmail(@PathVariable("email") String userEmail) {
        BaseResponseBody baseResponseBody = new BaseResponseBody();
        if (userService.duplicateId(userEmail)) {
            baseResponseBody.setResultMsg("사용 할 수 있는 이메일 입니다.");
        } else {

            baseResponseBody.setResultMsg("이미 가입된 이메일입니다.");
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }


    // 카카오 로그인

    @GetMapping("/auth/kakao/callback")
    @ResponseBody
    public Boolean kakaoCallback(String code) throws JsonProcessingException {

        System.out.println("들어왔니");

        // 가입 한 적이 없다면.
        if(userService.kakaoUserJoin(code) == null){
            return true;
        }

        // 가입한 적이 있으면.
        return false;


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
    public ResponseEntity<CustomResponseBody> userLogin(@RequestBody LoginDto loginDto) {
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        TokenDto token = userService.userLogin(loginDto);
        responseBody.getList().add(token);
//        return new ResponseEntity<>(userService.userLogin(loginDto), HttpStatus.OK);
        return ResponseEntity.ok().body(responseBody);
    }

    // mypage에 넣을 사용자 정보 추출하기
    @GetMapping("/mypage/{userNo}")
    public User mypageUser(@PathVariable("userNo") Long userNo){
        return userService.mypageUser(userNo);

    }

    // 마이페이지 정보 수정하기

}
