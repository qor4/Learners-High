package com.learnershigh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.user.*;
import com.learnershigh.service.etc.EmailService;
import com.learnershigh.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/user")
@Api(tags = {"사용자에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    private final EmailService emailService;

    // 유저 이메일로 userNo 값 뽑아내는 거 (userNo로 연관되니깐.)
    @GetMapping("/getUserNo")
    @ApiOperation("이메일로 userNo 뽑아내는 API")
    public Long getUserNo(@RequestParam("userEmail") String userEmail) {
        return userService.getUserNo(userEmail);
    }

    // 회원가입
    @PostMapping("/join")
    @ApiOperation("회원 가입")
    public User userJoin(@RequestBody JoinDto joinDto) {

        return userService.userJoin(joinDto);

        // true 면 가입 한 적 없음.
        // false 면 가입 한 적 있음.
    }

    // 회원탈퇴
    @PutMapping("/delete/{userNo}")
    @ApiOperation("회원 탈퇴")
    public ResponseEntity<BaseResponseBody> deleteUser(@PathVariable("userNo") Long userNo) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("탈퇴되었습니다.");
        try {
            userService.userDelete(userNo);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }


    // 비밀번호 변경 시 비밀번호 검사
    @GetMapping("/pwd-check/{userNo}")
    @ApiOperation("비밀번호 변경 시 원래 비밀번호 검사")
    public ResponseEntity<BaseResponseBody> pwdCheck(@PathVariable("userNo") Long userNo, @RequestParam("pwd") String pwd) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("비밀번호가 맞습니다.");
        try {
            userService.pwdCheck(userNo, pwd);
        } catch (IllegalStateException e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }

    // 비밀번호 변경
    @GetMapping("/pwd-change")
    @ApiOperation("비밀번호 변경")
    public ResponseEntity<BaseResponseBody> pwdChange(@RequestParam("userId") String userId ,@RequestParam("pwd") String pwd) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("비밀번호가 변경되었습니다.");
        try {
            userService.pwdChange(userId, pwd);
        } catch (IllegalStateException e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }


    // 아이디 중복
    @GetMapping("/duplicate/id/{id}")
    @ApiOperation("아이디 중복 확인")
    public ResponseEntity<BaseResponseBody> duplicateId(@PathVariable("id") String userId) {
        BaseResponseBody baseResponseBody = new BaseResponseBody();
        if (userService.duplicateId(userId)) {
            baseResponseBody.setResultMsg("사용 할 수 있는 아이디 입니다.");
            baseResponseBody.setResultCode(0);
        } else {
            baseResponseBody.setResultMsg("사용 할 수 없는 아이디 입니다.(중복된 아이디)");
            baseResponseBody.setResultCode(-1);
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }


    // 이메일 중복 (이메일로 아이디 찾을때도 사용해야함.)
    @GetMapping("/duplicate/email/{email}")
    @ApiOperation("이메일 중복 확인")
    public ResponseEntity<BaseResponseBody> duplicateEmail(@PathVariable("email") String userEmail) {
        BaseResponseBody baseResponseBody = new BaseResponseBody();
        if (userService.duplicateEmail(userEmail)) {
            baseResponseBody.setResultMsg("사용 할 수 있는 이메일 입니다.");
            baseResponseBody.setResultCode(0);
        } else {

            baseResponseBody.setResultMsg("이미 가입된 이메일입니다.");
            baseResponseBody.setResultCode(-1);
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }

    // 이메일 인증 번호 (아이디 찾기때 이메일 중복API 이용해서 성공시 사용해야함.)
    @PostMapping("/cert/email")
    @ApiOperation("이메일 인증")
    @ResponseBody
    public String mailSend(@RequestParam String email) throws Exception {
        String code = emailService.sendSimpleMessage(email);
        System.out.println("인증코드 : " + code);
        return code;

    }

    // 이메일로 아이디 찾기
    @PostMapping("/find/id")
    @ApiOperation("이메일로 아이디 찾기")
    public String searchId(@RequestParam("email") String email) {
        return userService.SearchId(email);

    }

    // 이메일, 아이디로 비밀번호 찾기  --> 아이디와 이메일을 가진 사용자가 있는지 확인만 해주는 기능
    @PostMapping("/find/pwd")
    @ApiOperation("이메일,아이디로 존재하는 사용자인지 확인")
    public Boolean searchPwd(@RequestParam String userId, @RequestParam String userEmail) {
        return userService.searchPwd(userId, userEmail);
    }

    // 카카오 로그인

    @GetMapping("/login/kakao/callback")
    @ApiOperation("카카오 로그인")
    @ResponseBody
    public ResponseEntity<CustomResponseBody> userLogin(@RequestParam(required = false) String code) throws JsonProcessingException {
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        try {
            HashMap<String, Object> userInfo = userService.kakaoUserJoin(code);

            responseBody.setResult(userInfo);
        } catch (IllegalStateException i) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(i.getMessage());
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 카카오 로그인시 user_tel, user_info, user_type이 비어있다면 검사하는 곳
    @GetMapping("/kakao/info/check/{userEmail}")
    @ApiOperation("카카오 로그인시 user_tel, user_info, user_type이 비어있다면 검사")
    public ResponseEntity<BaseResponseBody> kakaoEmailCheck(@PathVariable("userEmail") String userEmail) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("정보들이 비어있습니다.");
        try {
            userService.kakaoEmailCheck(userEmail);
            baseResponseBody.setResultCode(0);
            return ResponseEntity.ok().body(baseResponseBody);

        } catch (IllegalStateException i) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(i.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-2);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }

    }

    //카카오 로그인 추가 정보 받기
    @PostMapping("/kakao/addinfo/{userEmail}")
    @ApiOperation("카카오 로그인 추가 정보 받기")
    public ResponseEntity<CustomResponseBody> kakaoPlus(@RequestBody KakaoInfo kakaoInfo, @PathVariable("userEmail") String userEmail) {
        CustomResponseBody responseBody = new CustomResponseBody<>("정보들이 추가 되었습니다.");
        try {
            System.out.println(userService.kakaoPlus(kakaoInfo, userEmail));
            responseBody.setResult(userService.kakaoPlus(kakaoInfo, userEmail));
        } catch (IllegalStateException e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }


    // 경력 추가
    @PostMapping("/join/job/{userNo}")
    @ApiOperation("경력 추가")
    public ResponseEntity<BaseResponseBody> jobJoin(@RequestBody JobDto jobDto, @PathVariable("userNo") Long userNo) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("경력이 추가 되었습니다.");
        try {
            userService.jobJoin(jobDto, userNo);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }


    // 학위 추가
    @PostMapping("/join/edu/{userNo}")
    @ApiOperation("학위 추가")
    public ResponseEntity<BaseResponseBody> eduJoin(@RequestBody EduDto eduDto, @PathVariable("userNo") Long userNo) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("학위가 추가 되었습니다.");
        try {
            userService.eduJoin(eduDto, userNo);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation("일반 로그인")
    public ResponseEntity<CustomResponseBody> userLogin(@RequestBody LoginDto loginDto) {
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        try {
            HashMap<String, Object> userInfo = userService.userLogin(loginDto);
            responseBody.setResult(userInfo);
        } catch (IllegalStateException e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping("/refresh")
    @ApiOperation("refresh 토큰으로 access 토큰 재발급")
    public ResponseEntity<CustomResponseBody> refresh(@RequestBody TokenDto tokenDto) {
        CustomResponseBody responseBody = new CustomResponseBody<>("토큰 재발급");
        try {
            responseBody.setResult(userService.refresh(tokenDto));
        } catch (IllegalStateException e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }


}
