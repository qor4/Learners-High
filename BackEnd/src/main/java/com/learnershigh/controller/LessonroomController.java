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
@RequestMapping("/lessonroom")
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
    public ResponseEntity<BaseResponseBody> createLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo,@PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 생성 완료");
        try {
            lessonroomService.checkTeacher(userNo,lessonNo);
            openviduService.createSession(lessonNo,lessonRoundNo);
            String token = openviduService.createConnection(lessonNo,lessonRoundNo);
            responseBody.setResultMsg(token);
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
    }

    @GetMapping("/student/{lessonNo}/{lessonRoundNo}/{userNo}")
    @ApiOperation("수업 입장 및 출석")
    public ResponseEntity<BaseResponseBody> enterLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo, @PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("asd");
        try {
            lessonroomService.checkStudent(userNo,lessonNo);
            String token = openviduService.createConnection(lessonNo,lessonRoundNo);
//            lessonroomService.Attend(lessonRoundNo, userNo);
            responseBody.setResultMsg(token);
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
    }
}
