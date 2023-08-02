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
@RequestMapping("/s3")
@Api(tags = {"S3에 대한 API"})
@CrossOrigin("*")

public class AmazonS3Controller {


    private final S3Service s3Service;

    //  업로드 (class/수업no/Thumbnail)
    @PostMapping(value = "/thumbnailUpload/{classNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("수업 썸네일 파일 업로드 (class/수업no/Thumbnail)")
    public String thumbnailUpload(@RequestParam("multipartFile") MultipartFile multipartFile, @PathVariable("classNo") Long classNo) throws IOException {
        System.out.println("업로드");
        return s3Service.thumbnailUploadToAWS(multipartFile, "class/" + classNo + "/Thumbnail", classNo); // class 가 class/로 들어감.

    }

    //  업로드 (class/수업no/수업회차no/data)
    @PostMapping(value = "/dataUpload/{classNo}/{classRoundNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("수업 자료 파일 업로드 (class/수업no/수업회차no/data)")
    public String dataUpload(@RequestParam("multipartFile") MultipartFile multipartFile,@PathVariable("classHomeworkNo") Long classHomeworkNo, @PathVariable("classNo") Long classNo, @PathVariable("classRoundNo") Long classRoundNo) throws IOException {
        System.out.println("업로드");
        return s3Service.dataUploadToAWS(multipartFile, "class/" + classNo +"/" +  classRoundNo + "/data", classRoundNo); // class 가 class/로 들어감.

    }


    //  업로드 (class/수업no/수업회차no/homework)
    @PostMapping(value = "/homeworkUpload/{classHomeworkNo}/{classNo}/{classRoundNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("회차 과제 파일 업로드 (class/수업no/수업회차no/homework)")
    public String homeworkUpload(@RequestParam("multipartFile") MultipartFile multipartFile,@PathVariable("classHomeworkNo") Long classHomeworkNo, @PathVariable("classNo") Long classNo, @PathVariable("classRoundNo") Long classRoundNo) throws IOException {
        System.out.println("업로드");
        return s3Service.homeworkUploadToAWS(multipartFile, "class/" + classNo + "/" + classRoundNo + "/homework", classHomeworkNo); // class 가 class/로 들어감.

    }

    //  업로드 (user)
    @PostMapping(value = "/profileUpload/{userNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("사용자 프로필 사진 파일 업로드 (user)")
    public String profileUpload(@RequestParam("multipartFile") MultipartFile multipartFile, @PathVariable("userNo") Long userNo) throws IOException {
        System.out.println("업로드");
        return s3Service.profileUploadToAWS(multipartFile, "user", userNo); // class 가 class/로 들어감.

    }



////    강사가 올린 학습자료 다운로드
//    @PostMapping("/s3/dataDownload")
//    @ApiOperation("강사가 올린 학습자료 다운로드")
//    public void dataDownload(@RequestParam Long classRoundNo, HttpServletRequest request, HttpServletResponse response) {
//        // 파일네임은 완전한 파일네임 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
//        // 파일네임 값 넣을 때 주소 그대로 넣어줘야함. 예를들어 class/수업no/thumbnail 이라면
//        // class/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
//        // 다운로드파일네임은 다운로드를 누를 사람에게 저장될 이름 ex) cute.png.webp
//        System.out.println("다운로드");
//        s3Service.dataDownload(classRoundNo, request, response);
//
//    }
//
//    // 학생이 올린 과제 다운로드
//    @PostMapping("/homework-download")
//    @ApiOperation("학생이 올린 과제 다운로드")
//    public void homeworkDownload(@RequestParam("classHomeworkNo") Long classHomeworkNo, HttpServletRequest request, HttpServletResponse response) {
//
//        // 파일네임은 완전한 파일네임 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
//        // 파일네임 값 넣을 때 주소 그대로 넣어줘야함. 예를들어 class/수업no/thumbnail 이라면
//        // class/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
//        // 다운로드파일네임은 다운로드를 누를 사람에게 저장될 이름 ex) cute.png.webp
//        System.out.println("다운로드");
//        s3Service.homeworkDownload(classHomeworkNo, request, response);
//
//    }

    // 삭제
    @ApiOperation("파일 삭제")
    @PostMapping("/delete")
    public String delete(@RequestParam(required = false) String fileName) {
        // fileName 은 완전한 파일 네임 넣어야함 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // class/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        System.out.println("삭제");
        s3Service.delete(fileName);
        return fileName;
    }

//    // S3 thumbnail 불러오기
//    @ApiOperation("S3 thumbnail 불러오기")
//    @GetMapping("/thumbnail-load")
//    public String thumbnailLoad(@RequestParam Long classNo)
//    {
//        return s3Service.thumbnailLoad(classNo);
//    }
//
//
//    // S3 profile 불러오기
//    @ApiOperation("S3 profile 불러오기")
//    @GetMapping("/profile-load")
//    public String profileLoad(@RequestParam Long userNo)
//    {
//        return s3Service.profileLoad(userNo);
//    }


}
