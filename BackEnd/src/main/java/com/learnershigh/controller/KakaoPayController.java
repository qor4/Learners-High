package com.learnershigh.controller;


import com.learnershigh.dto.etc.KakaoPayApproveDto;
import com.learnershigh.dto.etc.KakaoPayCancelDto;
import com.learnershigh.dto.etc.KakaoPayDto;
import com.learnershigh.service.etc.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/kakaoPay")
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;


    // 결제 요청
    @PostMapping("/ready")
    public KakaoPayDto kakaoPayReady(){

        return kakaoPayService.kakaopayReady();
    }

    // 결제 성공
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken) {

        KakaoPayApproveDto kakaoApprove = kakaoPayService.kakaoApprove(pgToken);

        return new ResponseEntity<>(kakaoApprove, HttpStatus.OK);
    }

    // 결제 진행 중 취소
    @GetMapping("cancel")
    public void cancel(){
        throw new IllegalStateException("결제 진행 중 취소 되었습니다.");
    }

    // 결제 실패
    @GetMapping("fail")
    public void fail(){
        throw new IllegalStateException("결제가 실패되었습니다");
    }

    // 결제 환불
    @PostMapping("/refund")
    public ResponseEntity refund() {

        KakaoPayCancelDto kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }


}
