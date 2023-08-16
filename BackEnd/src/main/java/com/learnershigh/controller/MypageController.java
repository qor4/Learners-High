package com.learnershigh.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.user.EduDto;
import com.learnershigh.dto.user.JobDto;
import com.learnershigh.dto.user.JoinDto;
import com.learnershigh.dto.user.LoginDto;
import com.learnershigh.service.etc.EmailService;
import com.learnershigh.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/mypage")
@Api(tags = {"마이페이지에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class MypageController {

    private final UserService userService;

    private final EmailService emailService;


    // 비밀번호 변경하기
    @PutMapping("/modify/pwd/{userNo}")
    @ApiOperation("비밀번호 변경하기")
    public ResponseEntity<BaseResponseBody> pwdChange(@PathVariable("userIo") String userId, @RequestParam("pwd") String pwd) {
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

    // 마이페이지에서 보일 사용자 정보 추출하기
    @GetMapping("/{userNo}")
    @ApiOperation("사용자 정보 추출하기 (마이페이지)")
    public ResponseEntity<CustomResponseBody> mypageUser(@PathVariable("userNo") Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("사용자 정보 출력");
        JoinDto joinDto = userService.mypageUser(userNo);
        responseBody.setResult(joinDto);
        return ResponseEntity.ok().body(responseBody);

    }

    // 마이페이지 정보 수정하기
    @PutMapping("/modify/{userNo}")
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
    @GetMapping("/edu/list/{userNo}")
    @ApiOperation("강사 학위 모두 출력")
    public ResponseEntity<CustomResponseBody> eduList(@PathVariable("userNo") User userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 학위 출력");
        List<EduDto> eduDtoList = userService.eduList(userNo);
        responseBody.setResult(eduDtoList);
        return ResponseEntity.ok().body(responseBody);
    }


    // 강사 경력 all 출력
    @GetMapping("/job/list/{userNo}")
    @ApiOperation("강사 경력 모두 출력")
    public ResponseEntity<CustomResponseBody> jobList(@PathVariable("userNo") User userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 경력 출력");
        List<JobDto> jobDtoList = userService.jobList(userNo);
        responseBody.setResult(jobDtoList);
        return ResponseEntity.ok().body(responseBody);
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
