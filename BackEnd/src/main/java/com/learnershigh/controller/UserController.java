package com.learnershigh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.EmailService;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/user")
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

    // 비밀번호 변경하기
    @PutMapping("/update/pwd/{userNo}")
    @ApiOperation("비밀번호 변경하기")
    public ResponseEntity<BaseResponseBody> pwdChange(@PathVariable("userNo") Long userNo, @RequestParam("pwd") String pwd) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("비밀번호가 변경되었습니다.");
        try {
            userService.pwdChange(userNo, pwd);
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
            baseResponseBody.setResultMsg("사용 할 수 있는 아이디");
        } else {
            baseResponseBody.setResultMsg("사용 할 수 없는 아이디 입니다.(중복된 아이디)");
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }

    // 이메일 중복 (이메일로 아이디 찾을때도 사용해야함.)
    @GetMapping("/duplicate/email/{email}")
    @ApiOperation("이메일 중복 확인")
    public ResponseEntity<BaseResponseBody> duplicateEmail(@PathVariable("email") String userEmail) {
        BaseResponseBody baseResponseBody = new BaseResponseBody();
        if (userService.duplicateId(userEmail)) {
            baseResponseBody.setResultMsg("사용 할 수 있는 이메일 입니다.");
        } else {

            baseResponseBody.setResultMsg("이미 가입된 이메일입니다.");
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
    public String searchId(@RequestParam String email){
       return userService.SearchId(email);

    }

    // 이메일, 아이디로 비밀번호 찾기  --> 아이디와 이메일을 가진 사용자가 있는지 확인만 해주는 기능
    @PostMapping("/find/pwd")
    @ApiOperation("이메일,아이디로 존재하는 사용자인지 확인")
    public Boolean searchPwd(@RequestParam String userId, @RequestParam String userEmail){
        return userService.searchPwd(userId,userEmail);
    }

    // 카카오 로그인

    @GetMapping("/login/kakao/callback")
    @ApiOperation("카카오 로그인")
    @ResponseBody
    public Boolean kakaoCallback(String code) throws JsonProcessingException {

        System.out.println("들어왔니");

        // 가입 한 적이 없다면.
        if (userService.kakaoUserJoin(code) == null) {
            return true;
        }

        // 가입한 적이 있으면.
        return false;


    }

    // 경력 추가
    @PostMapping("/join/job/{userNo}")
    @ApiOperation("경력 추가")
    public void jobJoin(@RequestBody JobDto jobDto, @PathVariable("userNo") Long userNo) {

        userService.jobJoin(jobDto, userNo);
    }

    // 학위 추가
    @PostMapping("/join/edu/{userNo}")
    @ApiOperation("학위 추가")
    public void eduJoin(@RequestBody EduDto eduDto, @PathVariable("userNo") Long userNo) {

        userService.eduJoin(eduDto, userNo);
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation("일반 로그인")
//    @ApiOperation(value = "로그인", response = BaseResponseBody.class)
    public ResponseEntity<CustomResponseBody> userLogin(@RequestBody LoginDto loginDto) {
        CustomResponseBody responseBody = new CustomResponseBody<>("로그인 성공");
        HashMap<String, Object> userInfo = userService.userLogin(loginDto);
        responseBody.getList().add(userInfo);
        return ResponseEntity.ok().body(responseBody);
    }

    // 마이페이지에서 보일 사용자 정보 추출하기
    @GetMapping("/mypage/{userNo}")
    @ApiOperation("사용자 정보 추출하기 (마이페이지)")
    public JoinDto mypageUser(@PathVariable("userNo") Long userNo) {

        return userService.mypageUser(userNo);

    }

    // 마이페이지 정보 수정하기
    @PutMapping("mypage/modify/{userNo}")
    @ApiOperation("마이페이지 정보 수정")
    public ResponseEntity<BaseResponseBody> mypageModify(@PathVariable("userNo") Long userNo, @RequestBody JoinDto joinDto) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("정보가 변경되었습니다.");
        try {
            userService.mypageModify(userNo, joinDto);
        } catch (IllegalStateException e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }


    // 강사 학위 all 출력
    @GetMapping("edu-all-list/{userNo}")
    @ApiOperation("강사 학위 모두 출력")
    public List<EduDto> eduList(@PathVariable("userNo") User userNo) {
        return userService.eduList(userNo);
    }


    // 강사 경력 all 출력
    @GetMapping("job-all-list/{userNo}")
    @ApiOperation("강사 경력 모두 출력")
    public List<JobDto> jobList(@PathVariable("userNo") User userNo) {

       return userService.jobList(userNo);

    }


    // 강사 학력 수정
    @PutMapping("/modify/edu/{eduCareerNo}")
    @ApiOperation("강사 학력 수정")
    public ResponseEntity<BaseResponseBody> eduModify(@PathVariable("eduCareerNo") Long eduCareerNo, @RequestBody EduDto eduDto) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("수정되었습니다.");

        try {
            userService.eduModify(eduCareerNo, eduDto);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }

    // 강사 학력 삭제
    @DeleteMapping("/edu/delete/{eduCareerNo}")
    @ApiOperation("강사 학력 삭제")
    public ResponseEntity<BaseResponseBody> eduDelete(@PathVariable("eduCareerNo") Long eduCareerNo) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("삭제되었습니다.");

        try {
            userService.eduDelete(eduCareerNo);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }

    // 강사 경력 수정
    @PutMapping("/modify/job/{jobCareerNo}")
    @ApiOperation("강사 경력 수정")
    public ResponseEntity<BaseResponseBody> eduModify(@PathVariable("jobCareerNo") Long jobCareerNo, @RequestBody JobDto jobDto) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("수정되었습니다.");

        try {
            userService.jobModify(jobCareerNo, jobDto);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);

    }

    // 강사 경력 삭제
    @DeleteMapping("/job/delete/{jobCareerNo}")
    @ApiOperation("강사 경력 삭제")
    public ResponseEntity<BaseResponseBody> jobDelete(@PathVariable("jobCareerNo") Long jobCareerNo) {
        BaseResponseBody baseResponseBody = new BaseResponseBody("삭제되었습니다.");

        try {
            userService.jobDelete(jobCareerNo);
        } catch (Exception e) {
            baseResponseBody.setResultCode(-1);
            baseResponseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(baseResponseBody);
        }
        return ResponseEntity.ok().body(baseResponseBody);
    }


}
