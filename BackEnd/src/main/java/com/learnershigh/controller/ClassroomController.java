package com.learnershigh.controller;

import com.learnershigh.dto.BaseResponseBody;
import com.learnershigh.dto.CustomResponseBody;
import com.learnershigh.service.ClassRoundService;
import com.learnershigh.service.ClassroomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classroom")
@Api(tags = {"실시간 수업에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class ClassroomController {
    private final ClassroomService classroomService;
    private final ClassRoundService classRoundService;

    // 수업 생성 및 출석
    @GetMapping("/teacher/{classNo}/{classRoundNo}")
    @ApiOperation("수업 생성 및 출석")
    public ResponseEntity<BaseResponseBody> createClassroom(@PathVariable Long classNo, @PathVariable Long classRoundNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 생성 완료");
        classroomService.createClassroom(classNo, classRoundNo);
        return ResponseEntity.ok().body(responseBody);
    }

    // 수업 입장 및 출석
    @GetMapping("/student/{classNo}/{classRoundNo}/{userNo}")
    @ApiOperation("수업 입장 및 출석")
    public ResponseEntity<BaseResponseBody> enterClassroom(@PathVariable Long classNo, @PathVariable Long classRoundNo, @PathVariable Long userNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수업 입장 및 출석 완료");
        classroomService.enterClassroom(classNo, classRoundNo, userNo);
        return ResponseEntity.ok().body(responseBody);
    }
}
