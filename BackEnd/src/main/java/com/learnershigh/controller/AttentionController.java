package com.learnershigh.controller;


import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.CustomResponseBody;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.service.etc.AttentionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/attention")
@Api(tags = {"집중도에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class AttentionController {

    private final AttentionService attentionService;

    @PostMapping("/save")
    @ApiOperation("집중도 데이터 저장")
    public ResponseEntity<BaseResponseBody> saveAttentionRate(@RequestBody SaveAttentionRateDto saveAttentionRateDto) {
        BaseResponseBody responseBody = new BaseResponseBody("저장 완료");
        attentionService.saveAttentionRate(saveAttentionRateDto);
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/analysis/student/{userNo}/lesson/{lessonNo}")
    @ApiOperation("학생 수업의 종합 분석")
    public ResponseEntity<CustomResponseBody> studentLessonAnalysis(@PathVariable Long userNo, @PathVariable Long lessonNo){
        CustomResponseBody responseBody = new CustomResponseBody<>("학생 수업 종합 분석 데이터");
        HashMap<String, Object> result = new HashMap<>();
        // 한 수업의 한 학생의 집중도 평균
        result.put("myAttentionAvg", attentionService.oneStudentOneLessonAttentionAvg(userNo, lessonNo));
        // 한 수업의 모든 학생의 집중도 평균
        result.put("otherAttentionAvg", attentionService.allStudentOneLessonAttentionAvg(lessonNo));
        // 한 수업의 한 학생의 집중도 회차당
        result.put("myAttentionSegment", attentionService.oneStudentOneLessonAttentionList(userNo, lessonNo));
        // 한 수업의 모든 학생의 회차당 평균 집중도
        result.put("otherAttentionSegment", attentionService.allStudentOneLessonAttentionList(lessonNo));
        // 한 수업의 한 학생의 집중도 회차당 중 최대/최소 구간, 값
        result.put("myAttentionExtremes", attentionService.oneStudentOneLessonAttentionAvgAndMaxMin(userNo, lessonNo));
        // 한 수업의 모든 학생의 평균 집중도 회차당 중 최대/최소 구간. 값
        result.put("otherAttentionExtremes", attentionService.allStudentOneLessonAttentionAvgAndMaxMin(lessonNo));
        responseBody.setResult(result);
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/analysis/student/{userNo}/round/{lessonRoundNo}")
    @ApiOperation("학생 수업의 회차별 분석")
    public ResponseEntity<CustomResponseBody> studentLessonRoundAnalysis(@PathVariable Long userNo, @PathVariable Long lessonRoundNo){
        CustomResponseBody responseBody = new CustomResponseBody<>("학생 수업 회차별 분석 데이터");
        HashMap<String, Object> result = new HashMap<>();
        // 한 회차의 한 학생의 집중도 평균
        result.put("myAttentionAvg", attentionService.oneStudentOneRoundAttentionAvg(userNo, lessonRoundNo));
        // 한 회차의 모든 학생의 집중도 평균
        result.put("otherAttentionAvg", attentionService.allStudentOneRoundAttentionAvg(lessonRoundNo));
        // 한 회차의 한 학생의 집중도 20구간
        result.put("myAttentionSegment", attentionService.oneStudentOneRoundAttentionList(userNo, lessonRoundNo));
        // 한 회차의 모든 학생의 평균 집중도 20구간
        result.put("otherAttentionSegment", attentionService.allStudentOneRoundAttentionList(lessonRoundNo));
        // 한 회차의 한 학생의 집중도 20구간 중 최대/최소 구간, 값
        result.put("myAttentionExtremes", attentionService.oneStudentOneRoundAttentionAvgAndMaxMin(userNo, lessonRoundNo));
        // 한 회차의 모든 학생의 평균 집중도 20구간 중 최대/최소 구간. 값
        result.put("otherAttentionExtremes", attentionService.allStudentOneRoundAttentionAvgAndMaxMin(lessonRoundNo));
        responseBody.setResult(result);
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/analysis/teacher/{userNo}/lesson/{lessonNo}")
    @ApiOperation("강사 수업의 종합 분석")
    public ResponseEntity<CustomResponseBody> teacherLessonAnalysis(@PathVariable Long userNo, @PathVariable Long lessonNo){
        CustomResponseBody responseBody = new CustomResponseBody<>("강사 수업 종합 분석 데이터");
        HashMap<String, Object> result = new HashMap<>();
        // 한 수업의 모든 학생의 집중도 평균
        result.put("studentAttentionAvg", attentionService.allStudentOneLessonAttentionAvg(lessonNo));
        // 한 수업의 모든 학생의 평균 집중도 회차당
        result.put("studentAttentionSegment", attentionService.allStudentOneLessonAttentionList(lessonNo));
        // 한 수업의 모든 학생의 평균 집중도 회차당 중 최대/최소 구간. 값
        result.put("studentAttentionExtremes", attentionService.allStudentOneLessonAttentionAvgAndMaxMin(lessonNo));
        responseBody.setResult(result);
        return ResponseEntity.ok().body(responseBody);
    }

    @GetMapping("/analysis/teacher/{userNo}/round/{lessonRoundNo}")
    @ApiOperation("강사 수업의 회차별 분석")
    public ResponseEntity<CustomResponseBody> teacherLessonRoundAnalysis(@PathVariable Long userNo, @PathVariable Long lessonRoundNo){
        CustomResponseBody responseBody = new CustomResponseBody<>("강사 수업 회차별 분석 데이터");
        HashMap<String, Object> result = new HashMap<>();
        // 한 회차의 모든 학생의 집중도 평균
        result.put("studentAttentionAvg", attentionService.allStudentOneRoundAttentionAvg(lessonRoundNo));
        // 한 회차의 모든 학생의 평균 집중도 20구간
        result.put("otherAttentionSegment", attentionService.allStudentOneRoundAttentionList(lessonRoundNo));
        // 한 회차의 모든 학생의 평균 집중도 20구간 중 최대/최소 구간. 값
        result.put("studentAttentionExtremes", attentionService.allStudentOneRoundAttentionAvgAndMaxMin(lessonRoundNo));
        responseBody.setResult(result);
        return ResponseEntity.ok().body(responseBody);
    }



    //  그 수업을 듣는 모든 학생의 집중도 평균 20구간
    @GetMapping("/lesson/allstudent/attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionByLessonRoundNo() {
        CustomResponseBody responseBody = new CustomResponseBody("수업의 한 회차당 모든 학생의 집중도 평균입니다.");
        try {
            responseBody.setResult(attentionService.allStudentOneRoundAttentionAvg(1L));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 한 수업회차당 한 학생의 집중도 평균
    @GetMapping("/lesson/onestudent/attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionByLessonRoundNoandUserNo() {
        CustomResponseBody responseBody = new CustomResponseBody("수업의 한 회차의 한 학생의 집중도 평균입니다.");
        try {
//            responseBody.setResult(attentionService.oneStudentOneRoundAttentionAvg());
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

     // 한학생당 한수업의 한회차당 자기 집중도 (20구간)의 최대값,최소값 + 시간
    @GetMapping("/lesson/onestudent/attention-avg/max-min")
    public ResponseEntity<CustomResponseBody> aggregateAttentionBymaxmin(@RequestParam Long userNo, @RequestParam Long lessonRoundNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 회차의 한 학생의 집중도 최대값,최소값,시간");
        try {
            responseBody.setResult(attentionService.oneStudentOneRoundAttentionAvgAndMaxMin(userNo, lessonRoundNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 한수업의 한회차당 모든 학생의 집중도 (20구간)의 최대값,최소값 + 시간
    @GetMapping("/lesson/allstudent/attention-avg/max-min")
    public ResponseEntity<CustomResponseBody> aggregateAttentionAllstudentBymaxmin(@RequestParam Long lessonRoundNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 회차의 모든 학생의 집중도 최대값,최소값,시간");
        try {
            responseBody.setResult(attentionService.allStudentOneRoundAttentionAvgAndMaxMin(lessonRoundNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }

    // 하나의 수업의 모든 회차 집중도(모든 학생) 20구간
    @GetMapping("/lesson/allstudent/all-attention-avg")
    public ResponseEntity<CustomResponseBody> aggregateAttentionAllstudentAlllessonroundAvg(@RequestParam Long lessonNo) {
        CustomResponseBody responseBody = new CustomResponseBody("하나의 수업의 모든 회차 집중도(모든 학생) 20구간");
        try {
            responseBody.setResult(attentionService.allStudentOneLessonAttentionList(lessonNo));
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
    @GetMapping("/allLesson/onestudent/allavg")
    public ResponseEntity<CustomResponseBody> oneStudentMaxlessonAvg(@RequestParam("userNo") Long userNo) {
        CustomResponseBody responseBody = new CustomResponseBody("한 학생이 들은 모든 강의중 가장 집중도가 높은 수업");
        try {
            System.out.println(userNo
            );
            responseBody.setResult(attentionService.oneStudentMaxlessonAvg(userNo));
        } catch (Exception e) {
            responseBody.setResultCode(-1);
            responseBody.setResultMsg(e.getMessage());
            return ResponseEntity.ok().body(responseBody);
        }
        return ResponseEntity.ok().body(responseBody);
    }
}
