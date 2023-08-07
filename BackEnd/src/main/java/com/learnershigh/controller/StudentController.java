package com.learnershigh.controller;

import com.learnershigh.domain.user.User;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lessonhub.StudentAttendHomeworkDto;
import com.learnershigh.dto.lessonhub.StudentLessonActionDto;
import com.learnershigh.service.lesson.LessonService;
import com.learnershigh.service.user.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/student")
@Api(tags = {"학생에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")

public class StudentController {

    private final StudentService studentService;
    private final LessonService lessonService;

    // 강의 찜
    @PostMapping("/wish")
    @ApiOperation("강의 찜 (insert)")
    public ResponseEntity<BaseResponseBody> wish(@RequestBody StudentLessonActionDto studentLessonActionDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 성공");
        try {
            studentService.wish(studentLessonActionDto);
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


    @DeleteMapping("/wish/{userNo}/{lessonNo}")
    @ApiOperation("강의 찜 취소")
    public ResponseEntity<BaseResponseBody> deleteWish(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 취소");
        try {
            studentService.deleteWish(userNo, lessonNo);
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

    @GetMapping("/lesson/main/{userNo}")
    @ApiOperation("학생 강의 조회 완료(메인)")
    public ResponseEntity<CustomResponseBody> showWeeklyLessonSchedule(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("학생 메인 강의 조회 완료");
        HashMap<Integer, Object> mainLessonListDtoList = studentService.showWeeklyLessonSchedule(userNo);
        responseBody.setResult(mainLessonListDtoList);
        return ResponseEntity.ok().body(responseBody);
    }

    // 학생 강의 찜 목록 전체 출력
    @GetMapping("/wish/list")
    @ApiOperation("학생 찜 목록 전체 출력")
    public List<LessonListDto> wishListAll(@RequestParam("userNo") User userNo)
    {
        return studentService.wishListAll(userNo);
    }

    @GetMapping("/lesson/list/{userNo}")
    @ApiOperation("학생 수강 목록")
    public List<LessonListDto> userLessonAll(@PathVariable("userNo") Long userNo)
    {
        return studentService.userLessonAll(userNo);
    }

    @GetMapping("/{userNo}/lesson/{lessonNo}")
    @ApiOperation("학생 수강 관리 현황 탭")
    public ResponseEntity<CustomResponseBody> getStudentLessonDashboardInfo(@PathVariable("userNo") Long userNo, @PathVariable("lessonNo") Long lessonNo)
    {
        CustomResponseBody responseBody = new CustomResponseBody("강사 수업 관리 소개 탭 조회 완료");
        try {
            StudentAttendHomeworkDto attendHomeworkInfo = studentService.getStudentAttendHomeworkInfo(userNo, lessonNo);
            List<HashMap<String, Object>> fileInfo = studentService.getLessonRoundFileInfo(lessonNo);
            HashMap<String, Object> dashboardTab = new HashMap<>();
            dashboardTab.put("lessonNo", lessonNo);
            dashboardTab.put("lessonAttendHomeworkInfo", attendHomeworkInfo);
            dashboardTab.put("lessonRoundFileInfo", fileInfo);
            responseBody.setResult(dashboardTab);
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

    // 수강 신청 API
    @PostMapping("/apply")
    @ApiOperation("수강 신청")
    public ResponseEntity<BaseResponseBody> apply(@RequestBody StudentLessonActionDto studentLessonActionDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 수강 성공");
        try {
            lessonService.apply(studentLessonActionDto);
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

    @GetMapping("/{userNo}/lesson/{lessonNo}/state")
    @ApiOperation("학생 수강 신청 상태")
    public ResponseEntity<BaseResponseBody> getStudentLessonState(@PathVariable("userNo") Long userNo, @PathVariable("lessonNo") Long lessonNo) {
        BaseResponseBody responseBody = new BaseResponseBody("수강 신청이 가능합니다.");
        try {
            studentService.getStudentLessonState(userNo, lessonNo);
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
