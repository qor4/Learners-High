package com.learnershigh.controller;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.lesson.*;
import com.learnershigh.service.lesson.LessonRoundService;
import com.learnershigh.service.lesson.LessonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/lesson")
@Api(tags = {"수업에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class LessonController {

    private final LessonService lessonService;
    private final LessonRoundService lessonRoundService;

    // 강의 개설
    @PostMapping("/join")
    @ApiOperation("강의 개설")
    public ResponseEntity<CustomResponseBody> lessonJoin(@RequestBody LessonJoinDto lessonJoinDto) {
        CustomResponseBody responseBody = new CustomResponseBody("강의 개설 성공");
        try {
            Lesson lessonEntity = lessonService.lessonJoin(lessonJoinDto);
            HashMap<String, Long> lessonNo = new HashMap<>();
            lessonNo.put("lessonNo", lessonEntity.getLessonNo());
            responseBody.setResult(lessonNo);
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
    @ApiOperation("회차 개설")
    public ResponseEntity<CustomResponseBody> lessonRoundJoin(@RequestBody List<LessonRoundJoinDto> lessonRoundJoinDtoList) {
        CustomResponseBody responseBody = new CustomResponseBody("강의 회차 개설 성공");
        try {
            responseBody.setResult(lessonRoundService.lessonRoundJoin(lessonRoundJoinDtoList));
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
    @ApiOperation("강의 모든 목록 출력 (수강신청 목록에서 사용)")
    public ResponseEntity<CustomResponseBody> upcomingLessonList() {
        CustomResponseBody responseBody = new CustomResponseBody("강의 목록 출력");
        try {
            List<LessonListDto> list = lessonService.upcomingLessonList();
            responseBody.setResult(list);
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
    @ApiOperation("작성 중인 강의가 존재하는 지 확인")
    public ResponseEntity<CustomResponseBody> isWritingByUserNo(@PathVariable Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 조회 완료");
        HashMap<String, Object> isWriting = new HashMap<>();
        Lesson lessonDomain = lessonService.isWritingByUserNo(userNo);
        if (lessonDomain != null) {
            isWriting.put("isWriting", Boolean.TRUE);
            isWriting.put("lessonNo", lessonDomain.getLessonNo());
        } else {
            isWriting.put("isWriting", Boolean.FALSE);
        }
        responseBody.setResult(isWriting);
        return ResponseEntity.ok().body(responseBody);
    }

    // 작성 중인 강의 이어쓰기 안함
    @DeleteMapping("/delete/{lessonNo}")
    @ApiOperation("작성 중인 강의를 이어쓰지 않을 때 보내는 요청")
    public ResponseEntity<BaseResponseBody> deleteLesson(@PathVariable Long lessonNo) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 삭제 완료");
        lessonService.deleteLesson(lessonNo);
        return ResponseEntity.ok().body(responseBody);
    }

    // 수업 정보 작성 페이지 조회
    @GetMapping("/writing/info/{lessonNo}")
    @ApiOperation("수업 정보 작성 페이지 조회")
    public ResponseEntity<CustomResponseBody> getWritingLessonByLessonNo(@PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 정보 조회 완료");
        responseBody.setResult(lessonService.getWritingLessonByLessonNo(lessonNo));
        return ResponseEntity.ok().body(responseBody);
    }

    // 회차 정보 작성 페이지 조회
    @GetMapping("/writing/round/{lessonNo}")
    @ApiOperation("회차 정보 작성 페이지 조회")
    public ResponseEntity<CustomResponseBody> getWritingLessonRoundByLessonNo(@PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("작성중인 강의 회차 정보 조회 완료");
        responseBody.setResult(lessonRoundService.getWritingLessonRoundByLessonNo(lessonNo));
        return ResponseEntity.ok().body(responseBody);
    }


    // 강의 상세 정보
    @GetMapping("/{lessonNo}")
    @ApiOperation("강의 상세 정보")
    public ResponseEntity<CustomResponseBody> getLessonDetailByLessonNo(@PathVariable Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("강의 상세 정보 조회 완료");
        try {
            LessonDetailDto lessonDetailDto = new LessonDetailDto();
            LessonInfoDto lessonInfoDto = lessonService.getLessonDetailByLessonNo(lessonNo);
            List<LessonRoundDetailDto> lessonRoundDetailDtoList = lessonRoundService.getLessonRoundDetailByLessonNo(lessonNo);
            lessonDetailDto.setLessonInfo(lessonInfoDto);
            lessonDetailDto.setLessonRoundInfo(lessonRoundDetailDtoList);
            responseBody.setResult(lessonDetailDto);
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

    @GetMapping("/type")
    @ApiOperation("수업 분류 정보 조회 (type)")
    public ResponseEntity<CustomResponseBody> getLessonType() {
        CustomResponseBody responseBody = new CustomResponseBody("수업 분류 정보 조회 완료");
        responseBody.setResult(lessonService.getLessonType());
        return ResponseEntity.ok().body(responseBody);
    }

    // 강의 조회수 증가
    @PutMapping("/viewcount")
    @ApiOperation("클릭시 조회수 증가")
    public ResponseEntity<BaseResponseBody> viewCount(@RequestParam Long lessonNo) {
        BaseResponseBody responseBody = new BaseResponseBody("조회수 증가 성공");
        try {
            lessonService.viewCount(lessonNo);
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 메인페이지 강의 TOP5 출력
    @ApiOperation("강의 Top4 출력")
    @GetMapping("/list/main")
    public ResponseEntity<CustomResponseBody> mainTop5() {
        CustomResponseBody responseBody = new CustomResponseBody("조회수 TOP4 강의 출력");
        responseBody.setResult(lessonService.mainTop4());
        return ResponseEntity.ok().body(responseBody);
    }

    // 다중 검색 리스트 출력
    @ApiOperation("다중 검색 리스트 출력")
    @GetMapping("/search")
    public ResponseEntity<CustomResponseBody> multiSearch(@RequestParam(required = false) String searchBar, @RequestParam(required = false) String searchWord) {
        CustomResponseBody responseBody = new CustomResponseBody("다중 검색 강의리스트 출력");
        System.out.println(lessonService.multiSearch(searchBar, searchWord));
        responseBody.setResult(lessonService.multiSearch(searchBar, searchWord));
        return ResponseEntity.ok().body(responseBody);
    }


}
