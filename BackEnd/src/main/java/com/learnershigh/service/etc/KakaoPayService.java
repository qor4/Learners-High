package com.learnershigh.service.etc;


import com.learnershigh.dto.etc.KakaoPayApproveDto;
import com.learnershigh.dto.etc.KakaoPayCancelDto;
import com.learnershigh.dto.etc.KakaoPayDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoPayService {

    @Value("${kakaopay.admin.key}")
    private String admin_key;
    static final String cid = "TC0ONETIME";
    private KakaoPayDto kakaoPayDto;


    // 결제 승인 요청
    public KakaoPayDto kakaopayReady(Long lessonNo, int lessonPrice, String lessonName){

        String lessonNoString = Long.toString(lessonNo);

        String lessonPriceString = Integer.toString(lessonPrice);

        System.out.println(admin_key);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "KakaoAK "+ admin_key);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id","가맹점 회원 ID");
        parameters.add("item_name", lessonName);
        parameters.add("item_code", lessonNoString);
        parameters.add("quantity", "1");
        parameters.add("total_amount", lessonPriceString);
        parameters.add("tax_free_amount","0");
        parameters.add("approval_url","https://i9b105.p.ssafy.io/kakaoPay/success");
        parameters.add("fail_url","https://i9b105.p.ssafy.io/kakaoPay/fail?lessonNo=" + lessonNo);
        parameters.add("cancel_url","https://i9b105.p.ssafy.io/kakaoPay/cancel?lessonNo=" +lessonNo);
//        parameters.add("approval_url","http://localhost:3000/api/kakaoPay/success");
//        parameters.add("fail_url","http://localhost:3000/api/kakaoPay/fail?lessonNo=" + lessonNo);
//        parameters.add("cancel_url","http://localhost:3000/api/kakaoPay/cancel?lessonNo=" +lessonNo);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        kakaoPayDto = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoPayDto.class
        );

        return kakaoPayDto;

    }

    // 결제 승인
    public KakaoPayApproveDto kakaoApprove(String pgToken){

        System.out.println("결제 성공했니?");
        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        System.out.println(kakaoPayDto.getTid());
        parameters.add("tid", kakaoPayDto.getTid());
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "KakaoAK "+admin_key);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoPayApproveDto approveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoPayApproveDto.class);

        return approveResponse;
    }

    // 결제 환불

    public KakaoPayCancelDto kakaoCancel() {

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "KakaoAK "+admin_key);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoPayCancelDto cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoPayCancelDto.class);

        return cancelResponse;
    }
}
