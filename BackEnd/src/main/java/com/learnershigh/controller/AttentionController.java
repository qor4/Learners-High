package com.learnershigh.controller;


import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.service.etc.AttentionService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/attention")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AttentionController {

    private final AttentionService attentionService;

    @PostMapping("/save")
    public ResponseEntity<BaseResponseBody> saveAttentionRate(@RequestBody SaveAttentionRateDto saveAttentionRateDto) {
        BaseResponseBody responseBody = new BaseResponseBody("저장 완료");
        attentionService.saveAttentionRate(saveAttentionRateDto);
        return ResponseEntity.ok().body(responseBody);
    }
//    @GetMapping("/test")
//    public List<Object> test(){
//        return mongoDBService.test();
//    }

    //  그 수업을 듣는 모든 학생의 집중도 평균 20구간
    @GetMapping("lesson/allstudent/attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionByLessonRoundNo() {
        CustomResponseBody responseBody = new CustomResponseBody("한 수업의 모든 학생의 집중도 평균입니다.");
        try {
            responseBody.setResult(attentionService.allstudentOneroundAttentionAvg());
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 한 수업회차당 한 학생의 집중도 평균
    @GetMapping("lesson/onestudent/attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionByLessonRoundNoandUserNo() {
        CustomResponseBody responseBody = new CustomResponseBody("한 수업의 한 학생의 집중도 평균입니다.");
        try {
            responseBody.setResult(attentionService.onestudentOneroundAttentionAvg());
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

     // 한학생당 한수업의 한회차당 자기 집중도 (20구간)의 최대값,최소값 + 시간
    @GetMapping("lesson/onestudent/attention-avg/max-min")
    public ResponseEntity<CustomResponseBody> aggregateAttentionBymaxmin(@RequestParam Long userNo, @RequestParam Long lessonRoundNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 수업의 한 학생의 집중도 최대값,최소값,시간");
        try {
            responseBody.setResult(attentionService.onestudentOneroundAttentionAvgandMaxMin(userNo, lessonRoundNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 한수업의 한회차당 모든 학생의 집중도 (20구간)의 최대값,최소값 + 시간
    @GetMapping("lesson/allstudent/attention-avg/max-min")
    public ResponseEntity<CustomResponseBody> aggregateAttentionAllstudentBymaxmin(@RequestParam Long lessonRoundNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 수업의 모든 학생의 집중도 최대값,최소값,시간");
        try {
            responseBody.setResult(attentionService.allstudentOneroundAttentionAvgandMaxMin(lessonRoundNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 하나의 수업의 모든 회차 집중도(모든 학생) 20구간
    @GetMapping("lesson/allstudent/all-attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionAllstudentAlllessonroundAvg(@RequestParam Long lessonRoundNo) {
        CustomResponseBody responseBody = new CustomResponseBody("하나의 수업의 모든 회차 집중도(모든 학생) 20구간");
        try {
            responseBody.setResult(attentionService.oneClassAllroundAllstudent(lessonRoundNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

//    // 하나의 수업의 모든 회차 집중도(한명 학생) 20구간
//    @GetMapping("lesson/allstudent/all-attention-avg")
//    public ResponseEntity<CustomResponseBody> aggregateAttentionOnestudentAlllessonroundAvg(@RequestParam Long lessonRoundNo, @RequestParam Long userNo) {
//        CustomResponseBody responseBody = new CustomResponseBody("하나의 수업의 모든 회차 집중도(한명 학생) 20구간");
//        try {
//            responseBody.setResult(attentionService.oneClassAllroundOnestudent(lessonRoundNo, userNo));
//        } catch (Exception e) {
//            responseBody.setResultCode(-1);
//            responseBody.setResultMsg(e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
//        }
//        return ResponseEntity.ok().body(responseBody);
//    }

    // 한 학생이 들은 모든 강의중 가장 집중도가 높은 수업
    public ResponseEntity<CustomResponseBody> oneStudentMaxlessonAvg(@RequestParam Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 학생이 들은 모든 강의중 가장 집중도가 높은 수업");
        try {
            responseBody.setResult(attentionService.oneClassAllroundAllstudent(userNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }
}
