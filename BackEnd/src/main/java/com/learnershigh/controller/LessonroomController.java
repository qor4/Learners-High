package com.learnershigh.controller;

import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.service.etc.OpenviduService;
import com.learnershigh.service.lesson.LessonRoundService;
import com.learnershigh.service.lesson.LessonroomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessonroom")
@Api(tags = {"실시간 수업에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class LessonroomController {
    private final LessonroomService lessonroomService;
    private final LessonRoundService lessonRoundService;
    private final OpenviduService openviduService;
    // 수업 생성 및 출석
    @GetMapping("/teacher/{lessonNo}/{lessonRoundNo}/{userNo}")
    @ApiOperation("수업 생성 및 출석")
    public ResponseEntity<?> createLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo,@PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 생성 완료");
        try {
            lessonroomService.checkTeacher(userNo,lessonNo);
            String token = openviduService.createLessonRoom(lessonNo,lessonRoundNo,userNo);
            responseBody.setResultCode(200);
            responseBody.setResultMsg(token);
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("강의룸 생성 중 에러 발생 ");
        }
    }

    @GetMapping("/student/{lessonNo}/{lessonRoundNo}/{userNo}")
    @ApiOperation("수업 입장 및 출석")
    public ResponseEntity<?> enterLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo, @PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("asd");
        try {
            lessonroomService.checkStudent(userNo,lessonNo);
            String token = openviduService.EnterLessonRoom(lessonNo,lessonRoundNo,userNo);
            lessonroomService.Attend(lessonRoundNo, userNo);
            responseBody.setResultCode(200);
            responseBody.setResultMsg(token);
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("해당 방이 존재하지 않습니다.");
        }
    }
    @DeleteMapping("/teacher/{lessonNo}/{lessonRoundNo}/{userNo}")
    @ApiOperation("수업 종료 및 분석")
    public ResponseEntity<?> deleteLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo, @PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("asd");
        try {
            lessonroomService.checkTeacher(userNo,lessonNo);
            openviduService.deleteLessonRoom(lessonNo,lessonRoundNo,userNo);
            responseBody.setResultCode(200);
            responseBody.setResultMsg("수업을 종료하였습니다.");
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수업을 종료 중 에러가 발생하였습니다.");
        }
    }

}
