package com.learnershigh.controller;

import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.lessonhub.SatiDto;
import com.learnershigh.dto.lessonhub.SatiResultDto;
import com.learnershigh.dto.user.TokenDto;
import com.learnershigh.service.lessonhub.SatisfactionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/csat")
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

    // 만족도 존재하는 지 확인
    @GetMapping("/before/create/dupli/check")
    @ApiOperation("만족도 제출전 증복된 값있는 확인")
    public ResponseEntity<BaseResponseBody> beforeCreateCheck(@RequestParam("studentNo") Long studentNo, @RequestParam("teacherNo") Long teacherNo, @RequestParam("lessonRoundNo") Long lessonRoundNo) {
        BaseResponseBody responseBody = new BaseResponseBody("만족도를 제출하지 않았습니다.");
        try {
            satisfactionService.beforeCreateCheck(lessonRoundNo, teacherNo, studentNo);

        }catch (IllegalStateException i) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(i.getMessage());
            return ResponseEntity.ok().body(responseBody);

        }catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }




    // 수업 총 만족도
    @ApiOperation("강사의 모든 수업 총 만족도 뽑기")
    @GetMapping("/lesson/{teacherNo}")
    public ResponseEntity<CustomResponseBody> lessonSati(@PathVariable("teacherNo") Long teacherNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("강사의 모든 수업 총 만족도 뽑기");
        try {
            responseBody.setResult(satisfactionService.lessonAllSati(teacherNo));
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

    // 강사 총 만족도
    @ApiOperation("강사 모든 총 만족도 뽑기")
    @GetMapping("/teacher/{teacherNo}")
    public ResponseEntity<CustomResponseBody> teacherSati(@PathVariable("teacherNo") Long teacherNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("한 수업당 강사 총 만족도 뽑기");
        try {
            responseBody.setResult(satisfactionService.teacherAllSati(teacherNo));
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

    // 수업 회차당 수업 만족도 보기
    @ApiOperation("수업 하나당 수업 만족도 보기")
    @GetMapping("/onelesson/{lessonNo}")
    public ResponseEntity<CustomResponseBody> oneLessonLectureSati(@PathVariable("lessonNo") Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("수업 하나당 수업 만족도 보기");
        try {
            responseBody.setResult(satisfactionService.oneLessonLectureSati(lessonNo));
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

    // 수업 회차당 강사 만족도 보기
    @ApiOperation("수업 하나당 강사 만족도 보기")
    @GetMapping("/oneteacher/{lessonNo}")
    public ResponseEntity<CustomResponseBody> oneLessonTeacherSati(@PathVariable("lessonNo") Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("수업 하나당 강사 만족도 보기");
        try {
            responseBody.setResult(satisfactionService.oneLessonTeacherSati(lessonNo));
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
