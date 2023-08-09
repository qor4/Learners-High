package com.learnershigh.controller;


import com.learnershigh.dto.etc.BaseResponseBody;
import com.learnershigh.dto.etc.KakaoPayApproveDto;
import com.learnershigh.dto.etc.KakaoPayCancelDto;
import com.learnershigh.dto.etc.KakaoPayDto;
import com.learnershigh.service.etc.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kakaoPay")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;


    // 결제 요청
    @PostMapping("/ready")
    public KakaoPayDto kakaoPayReady(@RequestParam("lessonNo") Long lessonNo, @RequestParam("lessonPrice") int lessonPrice, @RequestParam("lessonName") String lessonName) {
        System.out.println("들어왔니?");
        System.out.println(lessonNo);

        return kakaoPayService.kakaopayReady(lessonNo, lessonPrice,lessonName);
    }

    // 결제 성공
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken) {
        System.out.println("성공했니?");

        KakaoPayApproveDto kakaoApprove = kakaoPayService.kakaoApprove(pgToken);

        return new ResponseEntity<>(kakaoApprove, HttpStatus.OK);
    }

    // 결제 진행 중 취소
    @GetMapping("/cancel")
    public ResponseEntity<BaseResponseBody> cancel() {
        BaseResponseBody baseResponseBody = new BaseResponseBody("결제가 취소되었습니다.");

        return ResponseEntity.ok().body(baseResponseBody);
    }


    // 결제 실패
    @GetMapping("/fail")
    public ResponseEntity<BaseResponseBody> fail() {
        BaseResponseBody baseResponseBody = new BaseResponseBody("결제가 실패되었습니다");

        return ResponseEntity.ok().body(baseResponseBody);    }


    // 결제 환불
    @PostMapping("/refund")
    public ResponseEntity refund() {

        KakaoPayCancelDto kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }


}
