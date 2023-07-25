package com.learnershigh.controller;

import com.learnershigh.dto.CustomResponseBody;
import com.learnershigh.service.TeacherService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/teacher")
@Api(tags = {"강사에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping("/class/main/{userNo}")
    public ResponseEntity<CustomResponseBody> showWeeklyClassSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 메인 강의 조회 완료");
        HashMap<Integer, Object> mainClassListDtoList = teacherService.showWeeklyClassSchedule(userNo);
        responseBody.getList().add(mainClassListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }
}
