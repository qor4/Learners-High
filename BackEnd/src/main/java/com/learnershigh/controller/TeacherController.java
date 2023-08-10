package com.learnershigh.controller;

import com.learnershigh.domain.user.User;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lesson.LessonRoundDetailDto;
import com.learnershigh.dto.lessonhub.LessonRoundHomeworkStatusDto;
import com.learnershigh.dto.lessonhub.HomeworkNoticeJoinDto;
import com.learnershigh.dto.lessonhub.StudentAttendHomeworkDto;
import com.learnershigh.dto.user.EduDto;
import com.learnershigh.dto.user.JobDto;
import com.learnershigh.dto.user.TeacherProfileDto;
import com.learnershigh.service.lesson.LessonRoundService;
import com.learnershigh.service.user.TeacherService;
import com.learnershigh.service.user.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/teacher")
@Api(tags = {"강사에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeacherController {
    private final TeacherService teacherService;
    private final LessonRoundService lessonRoundService;
    private final UserService userService;

    // 강사 메인 페이지 요일별 과목
    @GetMapping("/lesson/main/{userNo}")
    @ApiOperation("강사 메인 페이지 요일별 과목 조회")
    public ResponseEntity<CustomResponseBody> showWeeklyLessonSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 메인 강의 조회 완료");
        HashMap<Integer, Object> mainLessonListDtoList = teacherService.showWeeklyLessonSchedule(userNo);
        responseBody.setResult(mainLessonListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }

    // 강사 강의 목록
    @GetMapping("/lesson/list/{userNo}")
    @ApiOperation("강사 강의 목록 조회")
    public ResponseEntity<CustomResponseBody> teacherLessonList(@PathVariable Long userNo, @RequestParam String status) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 " + status + " 목록 조회 완료");
        try {
            List<LessonListDto> lessonList = teacherService.teacherLessonList(userNo, status);
            responseBody.setResult(lessonList);
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
            responseBody.setResult(teacherProfile);
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
    @PostMapping("/lesson/homeworknoti/join")
    @ApiOperation("과제 공지 등록")
    public ResponseEntity<BaseResponseBody> joinHomeworkNotice(@RequestBody HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        BaseResponseBody responseBody = new BaseResponseBody("과제 등록 성공");
        try {
            teacherService.joinHomeworkNotice(homeworkNoticeJoinDto);
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

    // 강사 수업 관리 학생 탭
    @GetMapping("/{userNo}/lesson/{lessonNo}/student")
    @ApiOperation("강사 수업 관리 학생 탭")
    public ResponseEntity<CustomResponseBody> getStudentTabInfo(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 학생 탭 조회 완료");
        try {
            List<LessonRoundDetailDto> lessonRoundDetailDtoList = lessonRoundService.getLessonRoundDetailByLessonNo(lessonNo);
            List<StudentAttendHomeworkDto> studentAttendHomeworkDtoList = teacherService.getStudentTabInfo(userNo, lessonNo);
            HashMap<String, Object> studentTabInfo = new HashMap<>();
            studentTabInfo.put("lessonRoundInfo", lessonRoundDetailDtoList);
            studentTabInfo.put("studentInfo", studentAttendHomeworkDtoList);
            responseBody.setResult(studentTabInfo);
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
    @GetMapping("/{userNo}/lesson/{lessonNo}/info")
    public ResponseEntity<CustomResponseBody> getInfoTab(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            String lessonInfo = teacherService.getInfoTab(userNo, lessonNo);
            HashMap<String, Object> InfoTab = new HashMap<>();
            InfoTab.put("lessonInfo", lessonInfo);
            responseBody.setResult(InfoTab);
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
    @GetMapping("/{userNo}/lesson/{lessonNo}/homework")
    public ResponseEntity<CustomResponseBody> getHomeworkTabInfo(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 과제 탭 조회 완료");
        try {
            List<LessonRoundHomeworkStatusDto> lessonHomeworkInfo = teacherService.getHomeworkTabInfo(userNo, lessonNo);
            responseBody.setResult(lessonHomeworkInfo);
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

    @GetMapping("/{userNo}/lesson/{lessonNo}/rate")
    @ApiOperation("강사 강의 목록에서 출석률/과제 제출률 조회")
    public ResponseEntity<CustomResponseBody> getAttendAndHomeworkRate(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("수업 별 출석률/과제 제출률 조회 완료");
        try {
            HashMap<String, Object> result = new HashMap<>();
            result.put("attendRate", teacherService.getAttendRate(userNo, lessonNo));
            result.put("homeworkRate", teacherService.getHomeworkRate(userNo, lessonNo));
            responseBody.setResult(result);
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
