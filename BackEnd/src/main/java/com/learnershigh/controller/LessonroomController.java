package com.learnershigh.controller;

import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.service.lesson.LessonRoundService;
import com.learnershigh.service.lesson.LessonroomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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

    // 수업 생성 및 출석
    @GetMapping("/teacher/{lessonNo}/{lessonRoundNo}")
    @ApiOperation("수업 생성 및 출석")
    public ResponseEntity<BaseResponseBody> createLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 생성 완료");
        lessonroomService.createLessonroom(lessonNo, lessonRoundNo);
        return ResponseEntity.ok().body(responseBody);
    }

    // 수업 입장 및 출석
    @GetMapping("/student/{lessonNo}/{lessonRoundNo}/{userNo}")
    @ApiOperation("수업 입장 및 출석")
    public ResponseEntity<BaseResponseBody> enterLessonroom(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo, @PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 입장 및 출석 완료");
        lessonroomService.enterLessonroom(lessonNo, lessonRoundNo, userNo);
        return ResponseEntity.ok().body(responseBody);
    }
}
