package com.seeso.controller;


import com.seeso.dto.SaveAttentionRateDto;
import com.seeso.service.SeesoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/seeso")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SeesoController {

    private final SeesoService seesoService;

    @PostMapping("/attention-rate")
    public ResponseEntity<String> saveAttentionRate(@RequestBody SaveAttentionRateDto saveAttentionRateDto) {
        String result = "저장 완료";
        seesoService.saveAttentionRate(saveAttentionRateDto);
        return ResponseEntity.ok().body(result);
    }
}
