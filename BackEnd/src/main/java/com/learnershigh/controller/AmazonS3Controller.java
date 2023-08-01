package com.learnershigh.controller;

import com.learnershigh.service.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
@Api(tags = {"S3에 대한 API"})
@CrossOrigin("*")

public class AmazonS3Controller {

    private final S3Service s3Service;

    //  업로드
    @PostMapping(value = "/s3/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("파일 업로드")
    public String upload(@RequestParam("multipartFile") MultipartFile multipartFile) throws IOException {
        System.out.println("업로드");
        return s3Service.uploadToAWS(multipartFile, "class/3/Thumbnail"); // class 가 class/로 들어감.

    }

    // 다운로드
    @PostMapping("/s3/download")
    @ApiOperation("파일 다운로드")
    public String download(@RequestParam(required = true) String fileName, @RequestParam(required = false) String downloadFileName, HttpServletRequest request, HttpServletResponse response) {
        String result = fileName;
        // 파일네임은 완전한 파일네임 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // 파일네임 값 넣을 때 주소 그대로 넣어줘야함. 예를들어 class/수업no/thumbnail 이라면
        // class/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        // 다운로드파일네임은 다운로드를 누를 사람에게 저장될 이름 ex) cute.png.webp
        System.out.println("다운로드");
        s3Service.download(fileName, downloadFileName, request, response);
        return result;

    }

    // 삭제
    @ApiOperation("파일 삭제")
    @PostMapping("/s3/delete")
    public String delete(@RequestParam(required = false) String fileName) {
        // fileName 은 완전한 파일 네임 넣어야함 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // class/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        System.out.println("삭제");
        s3Service.delete(fileName);
        return fileName;
    }



}
