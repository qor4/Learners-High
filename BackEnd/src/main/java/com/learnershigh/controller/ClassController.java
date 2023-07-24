package com.learnershigh.controller;

import com.learnershigh.domain.Class;
import com.learnershigh.dto.*;
import com.learnershigh.service.ClassRoundService;
import com.learnershigh.service.ClassService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/class")
@Api(tags = {"수업에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class ClassController {

    private final ClassService classService;
    private final ClassRoundService classRoundService;

    // 강의 개설
    @PostMapping("/join")
    public ResponseEntity<CustomResponseBody> classJoin(@RequestBody ClassJoinDto classJoinDto) {
        CustomResponseBody responseBody = new CustomResponseBody("강의 개설 성공");
        try {
            Class classEntity = classService.classJoin(classJoinDto);
            HashMap<String, Long> classNo = new HashMap<>();
            classNo.put("classNo", classEntity.getClassNo());
            responseBody.getList().add(classNo);
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

    @PostMapping("/join/round")
    public ResponseEntity<BaseResponseBody> classRoundJoin(@RequestBody List<ClassRoundJoinDto> classRoundJoinDtoList) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 회차 개설 성공");
        try {
            classRoundService.classRoundJoin(classRoundJoinDtoList);
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

    @GetMapping("/list/upcoming")
    public ResponseEntity<CustomResponseBody> upcomingClassList() {
        CustomResponseBody responseBody = new CustomResponseBody("강의 목록 출력");
        try {
//            List<ClassListProjectionInterface> list = classService.upcomingClassList();
            List<ClassListDto> list = classService.upcomingClassList();
            responseBody.getList().add(list);
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

    @GetMapping("/writing/{userNo}")
    public ResponseEntity<CustomResponseBody> isWritingByUserNo(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 조회 완료");
        HashMap<String, Object> isWriting = new HashMap<>();
        Class classDomain = classService.isWritingByUserNo(userNo);
        if (classDomain != null) {
            isWriting.put("isWriging", Boolean.TRUE);
            isWriting.put("classNo", classDomain.getClassNo());
        } else {
            isWriting.put("isWriging", Boolean.FALSE);
        }
        responseBody.getList().add(isWriting);
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/writing/info/{classNo}")
    public ResponseEntity<CustomResponseBody> getInfoByClassNo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 정보 조회 완료");
        responseBody.getList().add(classService.getInfoByClassNo(classNo));
        return ResponseEntity.ok().body(responseBody);
    }
    @GetMapping("/writing/round/{classNo}")
    public ResponseEntity<CustomResponseBody> getRoundByClassNo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 회차 정보 조회 완료");
        responseBody.getList().add(classRoundService.getRoundByClassNo(classNo));
        return ResponseEntity.ok().body(responseBody);
    }
}
