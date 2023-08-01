package com.learnershigh.controller;

import com.learnershigh.dto.BaseResponseBody;
import com.learnershigh.dto.SatiDto;
import com.learnershigh.service.SatisfactionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/csat")
@Api(tags = {"만족도에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class CsatController {

    private final SatisfactionService satisfactionService;

    // 만족도 제출 (insert)
    @PostMapping("/create")
    @ApiOperation("만족도 제출 (insert)")
    public ResponseEntity<BaseResponseBody> createCsat(@RequestBody SatiDto satiDto) {
        BaseResponseBody responseBody = new BaseResponseBody("만족도가 추가되었습니다.");
        try {
            satisfactionService.satiCreate(satiDto);
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }


    // 수업 총 만족도
    @ApiOperation("수업 총 만족도 뽑기")
    @GetMapping("/class-all-sati/{teacherNo}")
    public double classSati(@PathVariable("teacherNo") Long teacherNo)
    {
        System.out.println(satisfactionService.classAllSati(teacherNo));
        return satisfactionService.classAllSati(teacherNo);
    }

    // 강사 총 만족도
    @ApiOperation("강사 총 만족도 뽑기")
    @GetMapping("/teacher-all-sati/{teacherNo}")
    public double teacherSati(@PathVariable("teacherNo") Long teacherNo)
    {
        System.out.println(satisfactionService.classAllSati(teacherNo));
        return satisfactionService.classAllSati(teacherNo);
    }

    // 수업 회차당 수업 만족도 보기
    @ApiOperation("수업 하나당 수업 만족도 보기")
    @GetMapping("/class-one-sati/{classNo}")
    public double oneClassLectureSati(@PathVariable("classNo") Long classNo){
        return satisfactionService.oneClassLectureSati(classNo);
    }

    // 수업 회차당 강사 만족도 보기
    @ApiOperation("수업 하나당 강사 만족도 보기")
    @GetMapping("/teacher-one-all-sati/{classNo}")
    public double oneClassTeacherSati(@PathVariable("classNo") Long classNo){
        return satisfactionService.oneClassTeacherSati(classNo);
    }
}
