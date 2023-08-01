package com.learnershigh.controller;

import com.learnershigh.domain.Class;
import com.learnershigh.dto.*;
import com.learnershigh.service.ClassRoundService;
import com.learnershigh.service.TeacherService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/teacher")
@Api(tags = {"강사에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeacherController {
    private final TeacherService teacherService;
    private final ClassRoundService classRoundService;

    // 강사 메인 페이지 요일별 과목
    @GetMapping("/class/main/{userNo}")
    public ResponseEntity<CustomResponseBody> showWeeklyClassSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 메인 강의 조회 완료");
        HashMap<Integer, Object> mainClassListDtoList = teacherService.showWeeklyClassSchedule(userNo);
        responseBody.getList().add(mainClassListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }

    // 강사 강의 목록
    @GetMapping("/class/{userNo}")
    public ResponseEntity<CustomResponseBody> teacherClassList(@PathVariable Long userNo, @RequestParam String status) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 " + status + " 목록 조회 완료");
        try {
            List<ClassListDto> classList = teacherService.teacherClassList(userNo, status);
            responseBody.getList().add(classList);
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

    // 과제 등록
    @PostMapping("/class/homework/join")
    public ResponseEntity<BaseResponseBody> joinHomeworkNotice(@RequestBody HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        BaseResponseBody responseBody = new BaseResponseBody("과제 등록 성공");
        teacherService.joinHomeworkNotice(homeworkNoticeJoinDto);
        return ResponseEntity.ok().body(responseBody);
    }

    // 강사 수업 관리 학생 탭
    @GetMapping("/class/{classNo}/student")
    public ResponseEntity<CustomResponseBody> getStudentTabInfo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 학생 탭 조회 완료");
        try {
            List<ClassRoundDetailDto> classRoundDetailDtoList = classRoundService.getClassRoundDetailByClassNo(classNo);
            List<StudentAttendHomeworkDto> studentAttendHomeworkDtoList = teacherService.getStudentTabInfo(classNo);
            HashMap<String, Object> studentTabInfo = new HashMap<>();
            studentTabInfo.put("classRoundInfo", classRoundDetailDtoList);
            studentTabInfo.put("studentInfo", studentAttendHomeworkDtoList);
            responseBody.getList().add(studentTabInfo);
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

    // 강사 수업 관리 소개 탭
    @GetMapping("/class/{classNo}/info")
    public ResponseEntity<CustomResponseBody> getInfoTab(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            String classInfo = classRoundService.getInfoTab(classNo);
            HashMap<String, Object> InfoTab = new HashMap<>();
            InfoTab.put("classInfo", classInfo);
            responseBody.getList().add(InfoTab);
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
