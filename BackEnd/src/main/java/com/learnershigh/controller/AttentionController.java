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
    @GetMapping("lesson/all-student/attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionByLessonRoundNo() {
        CustomResponseBody responseBody = new CustomResponseBody("한 수업의 모든 학생의 집중도 평균입니다.");
        try {
            responseBody.setResult(attentionService.studentOneroundAttentionAvg());
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }
}
