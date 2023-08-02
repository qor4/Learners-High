package com.learnershigh.controller;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.ClassRoundService;
import com.learnershigh.service.TeacherService;
import com.learnershigh.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
    private final UserService userService;

    // 강사 메인 페이지 요일별 과목
    @GetMapping("/class/main/{userNo}")
    @ApiOperation("강사 메인 페이지 요일별 과목 조회")
    public ResponseEntity<CustomResponseBody> showWeeklyClassSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 메인 강의 조회 완료");
        HashMap<Integer, Object> mainClassListDtoList = teacherService.showWeeklyClassSchedule(userNo);
        responseBody.getList().add(mainClassListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }

    // 강사 강의 목록
    @GetMapping("/class/{userNo}")
    @ApiOperation("강사 강의 목록 조회")
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

    @GetMapping("/profile/{userNo}")
    @ApiOperation("강사 프로필 조회")
    public ResponseEntity<CustomResponseBody> getTeacherProfile(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 프로필 조회 완료");
        try {
            TeacherProfileDto teacherProfile = teacherService.getTeacherProfile(userNo);
            User user = new User();
            user.setUserNo(userNo);
            List<EduDto> eduDtoList = userService.eduList(user);
            List<JobDto> jobDtoList = userService.jobList(user);
            teacherProfile.setEduInfos(eduDtoList);
            teacherProfile.setJobInfos(jobDtoList);
            responseBody.getList().add(teacherProfile);
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
    @ApiOperation("과제 공지 등록")
    public ResponseEntity<BaseResponseBody> joinHomeworkNotice(@RequestBody HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        BaseResponseBody responseBody = new BaseResponseBody("과제 등록 성공");
        teacherService.joinHomeworkNotice(homeworkNoticeJoinDto);
        return ResponseEntity.ok().body(responseBody);
    }

    // 강사 수업 관리 학생 탭
    @GetMapping("/class/{classNo}/student")
    @ApiOperation("강사 수업 관리 학생 탭")
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
    @ApiOperation("강사 수업 관리 소개 탭")
    @GetMapping("/class/{classNo}/info")
    public ResponseEntity<CustomResponseBody> getInfoTab(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            String classInfo = teacherService.getInfoTab(classNo);
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

    // 강사 수업 관리 과제 탭
    @ApiOperation("강사 수업 관리 과제 탭")
    @GetMapping("/class/{classNo}/homework")
    public ResponseEntity<CustomResponseBody> getHomeworkTabInfo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            List<ClassRoundHomeworkStatusDto> classHomeworkInfo = teacherService.getHomeworkTabInfo(classNo);
            for(ClassRoundHomeworkStatusDto classRoundHomeworkStatusDto: classHomeworkInfo) {
                responseBody.getList().add(classRoundHomeworkStatusDto);
            }
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
