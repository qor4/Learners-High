package com.learnershigh.controller;

import com.learnershigh.dto.*;
import com.learnershigh.service.StudentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/student")
@Api(tags = {"학생에 대한 API"})
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentController {
    private final StudentService studentService;
    // 강의 찜
    @PostMapping("/wish")
    public ResponseEntity<BaseResponseBody> wish(@RequestBody WishDto wishDto) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 성공");
        try {
            studentService.wish(wishDto);
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


    @DeleteMapping("/wish/{userNo}/{classNo}")
    public ResponseEntity<BaseResponseBody> deleteWish(@PathVariable Long userNo, @PathVariable Long classNo) {
        BaseResponseBody responseBody = new BaseResponseBody("강의 위시 취소");
        try {
            studentService.deleteWish(userNo, classNo);
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