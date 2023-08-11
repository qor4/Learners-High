package com.learnershigh.controller;


import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.service.etc.MongoDBService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/attend")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MongoDBController {

    private final MongoDBService mongoDBService;

    @PostMapping("/save")
    public ResponseEntity<String> saveAttentionRate(@RequestBody SaveAttentionRateDto saveAttentionRateDto) {
        String result = "저장 완료";
        mongoDBService.saveAttentionRate(saveAttentionRateDto);
        return ResponseEntity.ok().body(result);
    }
//    @GetMapping("/test")
//    public List<Object> test(){
//        return mongoDBService.test();
//    }
}
