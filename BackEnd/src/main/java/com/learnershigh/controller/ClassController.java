package com.learnershigh.controller;

import com.learnershigh.dto.*;
import com.learnershigh.service.ClassService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/class")
@Api(tags = {"수업에 대한 API"})
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    // 강의 개설
    @PostMapping("/class-join")
    public ResponseEntity<BaseResponseBody> classJoin(@RequestBody ClassJoinDto classJoinDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 개설 성공");
        try {
            classService.classJoin(classJoinDto);
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
