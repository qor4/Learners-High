package com.learnershigh.controller;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/student")
@Api(tags = {"학생에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")

public class StudentController {

    private final StudentService studentService;

    // 강의 찜
    @PostMapping("/wish")
    @ApiOperation("강의 찜 (insert)")
    public ResponseEntity<BaseResponseBody> wish(@RequestBody StudentClassActionDto studentClassActionDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 성공");
        try {
            studentService.wish(studentClassActionDto);
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


    @DeleteMapping("/wish/{userNo}/{classNo}")
    @ApiOperation("강의 찜 취소")
    public ResponseEntity<BaseResponseBody> deleteWish(@PathVariable Long userNo, @PathVariable Long classNo) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 취소");
        try {
            studentService.deleteWish(userNo, classNo);
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

    @GetMapping("/class/main/{userNo}")
    @ApiOperation("학생 강의 조회 완료(메인)")
    public ResponseEntity<CustomResponseBody> showWeeklyClassSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("학생 메인 강의 조회 완료");
        HashMap<Integer, Object> mainClassListDtoList = studentService.showWeeklyClassSchedule(userNo);
        responseBody.getList().add(mainClassListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }

    // 학생 강의 찜 목록 전체 출력
    @GetMapping("/wish/list")
    @ApiOperation("학생 찜 목록 전체 출력")
    public List<ClassListDto> wishListAll(@RequestParam("userNo") User userNo)
    {
        return studentService.wishListAll(userNo);
    }

    @GetMapping("/class/list/{userNo}")
    @ApiOperation("학생 수강 목록")
    public List<ClassListDto> userClassAll(@PathVariable("userNo") Long userNo)
    {
        return studentService.userClassAll(userNo);
    }

    @GetMapping("/{userNo}/class/{classNo}")
    @ApiOperation("학생 수강 관리 현황 탭")
    public ResponseEntity<CustomResponseBody> getStudentClassDashboardInfo(@PathVariable("userNo") Long userNo, @PathVariable("classNo") Long classNo)
    {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            StudentAttendHomeworkDto attendHomeworkInfo = studentService.getStudentAttendHomeworkInfo(userNo, classNo);
            List<HashMap<String, Object>> fileInfo = studentService.getClassRoundFileInfo(classNo);
            HashMap<String, Object> dashboardTab = new HashMap<>();
            dashboardTab.put("classNo", classNo);
            dashboardTab.put("classAttendHomeworkInfo", attendHomeworkInfo);
            dashboardTab.put("classRoundFileInfo", fileInfo);
            responseBody.getList().add(dashboardTab);
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
