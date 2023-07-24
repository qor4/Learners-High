package com.learnershigh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
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
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/join")
    public User userJoin(@RequestBody JoinDto joinDto) {

        return userService.userJoin(joinDto);

        // true 면 가입 한 적 없음.
        // false 면 가입 한 적 있음.
    }

    // 아이디 중복
    @GetMapping("/duplicate/id/{id}")
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
    @GetMapping("/duplicate/email/{email}")
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

    @GetMapping("/login/kakao/callback")
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
    @PostMapping("/join/job")
    public JobCareer jobJoin(@RequestBody JobDto jobDto) {

        return userService.jobJoin(jobDto);
    }

    // 학위 추가
    @PostMapping("/join/edu")
    public EduCareer eduJoin(@RequestBody EduDto eduDto) {

        return userService.eduJoin(eduDto);
    }

    // 로그인
    @PostMapping("/login")
//    @ApiOperation(value = "로그인", response = BaseResponseBody.class)
    public ResponseEntity<CustomResponseBody> userLogin(@RequestBody LoginDto loginDto) {
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        TokenDto token = userService.userLogin(loginDto);
        responseBody.getList().add(token);
//        return new ResponseEntity<>(userService.userLogin(loginDto), HttpStatus.OK);
        return ResponseEntity.ok().body(responseBody);
    }

    // 마이페이지에서 보일 사용자 정보 추출하기
    @GetMapping("/mypage/{userNo}")
    public JoinDto mypageUser(@PathVariable("userNo") Long userNo){

        return userService.mypageUser(userNo);

    }

    // 마이페이지 정보 수정하기
    @PutMapping("/user/modify/{userNo}")
    public void mypageModify(@PathVariable("userNo") Long userNo, @RequestBody JoinDto joinDto){
         userService.mypageModify(userNo, joinDto);
    }
}
