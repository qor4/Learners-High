package com.learnershigh.controller;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.User;
import com.learnershigh.dto.*;
import com.learnershigh.service.ClassRoundService;
import com.learnershigh.service.ClassService;
import com.learnershigh.service.UserService;
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
    private final UserService userService;

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

    // 회차 개설
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

    // 강의 전 목록 출력(수강신청 목록에서 사용)
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

    // 작성 중인 강의가 존재하는지
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

    // 수업 정보 작성 페이지 조회
    @GetMapping("/writing/info/{classNo}")
    public ResponseEntity<CustomResponseBody> getWritingClassByClassNo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 정보 조회 완료");
        responseBody.getList().add(classService.getWritingClassByClassNo(classNo));
        return ResponseEntity.ok().body(responseBody);
    }

    // 회차 정보 작성 페이지 조회
    @GetMapping("/writing/round/{classNo}")
    public ResponseEntity<CustomResponseBody> getWritingClassRoundByClassNo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 회차 정보 조회 완료");
        responseBody.getList().add(classRoundService.getWritingClassRoundByClassNo(classNo));
        return ResponseEntity.ok().body(responseBody);
    }

    // 수강 신청 API
    @PostMapping("/apply")
    public ResponseEntity<BaseResponseBody> apply(@RequestBody StudentClassActionDto studentClassActionDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 수강 성공");
        try {
            classService.apply(studentClassActionDto);
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

    // 강의 상세 정보
    @GetMapping("/{classNo}")
    public ResponseEntity<CustomResponseBody> getClassDetailByClassNo(@PathVariable Long classNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강의 상세 정보 조회 완료");
        try {
            ClassDetailDto classDetailDto = new ClassDetailDto();
            ClassInfoDto classInfoDto = classService.getClassDetailByClassNo(classNo);
            List<ClassRoundDetailDto> classRoundDetailDtoList = classRoundService.getClassRoundDetailByClassNo(classNo);
            User user = new User();
            user.setUserNo(classInfoDto.getUserNo());
            List<EduDto> eduDtoList = userService.eduList(user);
            List<JobDto> jobDtoList = userService.jobList(user);
            classDetailDto.setClassInfo(classInfoDto);
            classDetailDto.setClassRoundInfo(classRoundDetailDtoList);
            classDetailDto.setEduInfos(eduDtoList);
            classDetailDto.setJobInfos(jobDtoList);
            responseBody.getList().add(classDetailDto);
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
