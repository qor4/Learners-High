package com.learnershigh.controller;

import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lessonhub.StudentAttendHomeworkDto;
import com.learnershigh.dto.lessonhub.StudentLessonActionDto;
import com.learnershigh.repository.lessonhub.WarningRepository;
import com.learnershigh.service.lesson.LessonService;
import com.learnershigh.service.lessonhub.WarningService;
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
    private final WarningService warningService;

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

    // 강의 찜
    @GetMapping("/{userNo}/wish/{lessonNo}")
    @ApiOperation("강의 하나에 대한 학생의 찜 여부")
    public ResponseEntity<BaseResponseBody> isWish(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        BaseResponseBody responseBody = new BaseResponseBody();
        try {
            if (studentService.isWish(userNo, lessonNo)) {
                responseBody.setResultMsg("찜한 강의입니다.");
                responseBody.setResultCode(0);
            } else {
                responseBody.setResultMsg("찜한 강의가 아닙니다.");
                responseBody.setResultCode(1);
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
    public List<LessonListDto> wishListAll(@RequestParam("userNo") User userNo) {
        return studentService.wishListAll(userNo);
    }

    @GetMapping("/lesson/list/{userNo}")
    @ApiOperation("학생 수강 목록")
    public ResponseEntity<CustomResponseBody> userLessonAll(@PathVariable("userNo") Long userNo, @RequestParam String status) {
        CustomResponseBody responseBody = new CustomResponseBody("학생 " + status + " 수강 목록 조회 완료");
        responseBody.setResult(studentService.userLessonAll(userNo, status));
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/{userNo}/lessonroom/{lessonNo}/check")
    @ApiOperation("학생 수강 수업 강의룸 입장 가능 여부")
    public ResponseEntity<CustomResponseBody> isEnterLessonroom(@PathVariable Long userNo, @PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("학생 수강 수업 강의룸 입장 가능 여부");
        try {
            LessonRound lessonRound = studentService.isEnterLessonroom(userNo, lessonNo);
            if (lessonRound != null) {
                HashMap<String, Long> result = new HashMap<>();
                responseBody.setResultMsg("입장 가능한 강의입니다.");
                responseBody.setResultCode(0);
                result.put("lessonRoundNo", lessonRound.getLessonRoundNo());
                responseBody.setResult(result);
            } else {
                responseBody.setResultMsg("입장 가능한 강의가 아닙니다.");
                responseBody.setResultCode(1);
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

    @GetMapping("/{userNo}/lesson/{lessonNo}/rate")
    @ApiOperation("학생 수업 별 출석률/과제 제출률 조회 완료")
    public ResponseEntity<CustomResponseBody> getAttendAndHomeworkRate(@PathVariable("userNo") Long userNo, @PathVariable("lessonNo") Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("수업 별 출석률/과제 제출률 조회 완료");
        try {
            HashMap<String, Object> result = new HashMap<>();
            result.put("attendRate", studentService.getAttendRate(userNo, lessonNo));
            result.put("homeworkRate", studentService.getHomeworkRate(userNo, lessonNo));
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

    @GetMapping("/{userNo}/lesson/{lessonNo}")
    @ApiOperation("학생 수강 관리 현황 탭")
    public ResponseEntity<CustomResponseBody> getStudentLessonDashboardInfo(@PathVariable("userNo") Long userNo, @PathVariable("lessonNo") Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("학생 수강 관리 현황 탭 조회 완료");
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

    // 한 수업에 대한 한 학생의 모든 주의 배열
    @GetMapping("warning/{userNo}/{lessonNo}")
    @ApiOperation("한 수업에 대한 한 학생의 주의 배열, 모든 학생에 대한 주의 배열")
    public ResponseEntity<CustomResponseBody> oneLessononeStudentWarning(@PathVariable("userNo")Long userNo,@PathVariable("lessonNo")Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("한 수업에 대한 한 학생의 주의 배열, 모든 학생에 대한 주의 배열");
        try {
            HashMap<String, Object> result = new HashMap<>();
            result.put("myWarning", warningService.oneStudentOneLesson(userNo,lessonNo));
            result.put("allWarning", warningService.allStudentOneLesson(lessonNo));
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

    // 한 학생에 대한 수업 분류의 갯수
    @GetMapping("allLesson/lesson-type-cnt/{userNo}")
    @ApiOperation("한 학생에 대한 수업 분류의 갯수")
    public ResponseEntity<CustomResponseBody> lessonTypeCnt(@PathVariable("userNo")Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody<>("한 학생에 대한 수업 분류의 갯수 출력");
        try {
            responseBody.setResult(studentService.lessonTypeCnt(userNo));

        } catch (IllegalStateException e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            responseBody.setResultCode(-2);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }
}
