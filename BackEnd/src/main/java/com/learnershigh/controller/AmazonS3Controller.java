package com.learnershigh.controller;

import com.learnershigh.service.etc.S3Service;
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

    //  업로드 (lesson/수업no/Thumbnail)
    @PostMapping(value = "/upload/thumbnail/{lessonNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("수업 썸네일 파일 업로드 (lesson/수업no/Thumbnail)")
    public String thumbnailUpload(@RequestParam("multipartFile") MultipartFile multipartFile, @PathVariable("lessonNo") Long lessonNo) throws IOException {
        System.out.println("업로드");
        return s3Service.thumbnailUploadToAWS(multipartFile, "lesson/" + lessonNo + "/Thumbnail", lessonNo); // lesson 가 lesson/로 들어감.

    }

    //  업로드 (lesson/수업no/수업회차no/data)
    @PostMapping(value = "/upload/data/{lessonNo}/{lessonRoundNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("수업 자료 파일 업로드 (lesson/수업no/수업회차no/data)")
    public String dataUpload(@RequestParam("multipartFile") MultipartFile multipartFile,@PathVariable("lessonHomeworkNo") Long lessonHomeworkNo, @PathVariable("lessonNo") Long lessonNo, @PathVariable("lessonRoundNo") Long lessonRoundNo) throws IOException {
        System.out.println("업로드");
        return s3Service.dataUploadToAWS(multipartFile, "lesson/" + lessonNo +"/" +  lessonRoundNo + "/data", lessonRoundNo); // lesson 가 lesson/로 들어감.

    }


    //  업로드 (lesson/수업no/수업회차no/homework)
    @PostMapping(value = "/upload/homework/{lessonNo}/{lessonRoundNo}/{lessonHomeworkNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("학생 회차 당 과제 파일 업로드 (lesson/수업no/수업회차no/homework)")
    public String homeworkUpload(@RequestParam("multipartFile") MultipartFile multipartFile,@PathVariable("lessonHomeworkNo") Long lessonHomeworkNo, @PathVariable("lessonNo") Long lessonNo, @PathVariable("lessonRoundNo") Long lessonRoundNo) throws IOException {
        System.out.println("업로드");
        return s3Service.homeworkUploadToAWS(multipartFile, "lesson/" + lessonNo + "/" + lessonRoundNo + "/homework", lessonHomeworkNo); // lesson 가 lesson/로 들어감.

    }

    //  업로드 (user)
    @PostMapping(value = "/upload/profile/{userNo}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation("사용자 프로필 사진 파일 업로드 (user)")
    public String profileUpload(@RequestParam("multipartFile") MultipartFile multipartFile, @PathVariable("userNo") Long userNo) throws IOException {
        System.out.println("업로드");
        return s3Service.profileUploadToAWS(multipartFile, "user", userNo); // lesson 가 lesson/로 들어감.

    }



//    강사가 올린 학습자료 다운로드,
    @PostMapping("/s3/data-download")
    @ApiOperation("강사가 올린 학습자료 다운로드")
    public void dataDownload(@RequestParam("lessonRoundNo") Long lessonRoundNo, HttpServletRequest request, HttpServletResponse response) {
        // 파일네임은 완전한 파일네임 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // 파일네임 값 넣을 때 주소 그대로 넣어줘야함. 예를들어 lesson/수업no/thumbnail 이라면
        // lesson/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        // 다운로드파일네임은 다운로드를 누를 사람에게 저장될 이름 ex) cute.png.webp
        System.out.println("다운로드");
        s3Service.dataDownload(lessonRoundNo, request, response);

    }

//// 학생이 올린 과제 다운로드

    @PostMapping("/homework-download")
    @ApiOperation("학생이 올린 과제 다운로드")
    public void homeworkDownload(@RequestParam("lessonHomeworkNo") Long lessonHomeworkNo, HttpServletRequest request, HttpServletResponse response) {

        // 파일네임은 완전한 파일네임 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // 파일네임 값 넣을 때 주소 그대로 넣어줘야함. 예를들어 lesson/수업no/thumbnail 이라면
        // lesson/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        // 다운로드파일네임은 다운로드를 누를 사람에게 저장될 이름 ex) cute.png.webp
        System.out.println("다운로드");
        s3Service.homeworkDownload(lessonHomeworkNo, request, response);

    }

    // 삭제
    @ApiOperation("파일 삭제")
    @PostMapping("/delete")
    public String delete(@RequestParam(required = false) String fileName) {
        // fileName 은 완전한 파일 네임 넣어야함 ex) cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp
        // lesson/수업no/thumbnail/cb32dc25-8d6d-4c49-a4d5-af011221a57c_cute.png.webp  --> 이렇게 넣어줘야함.
        System.out.println("삭제");
        s3Service.delete(fileName);
        return fileName;
    }

    // S3 thumbnail 불러오기
    @ApiOperation("S3 thumbnail 불러오기")
    @GetMapping("/thumbnail-load")
    public String thumbnailLoad(@RequestParam Long lessonNo)
    {
        return s3Service.thumbnailLoad(lessonNo);
    }


    // S3 profile 불러오기
    @ApiOperation("S3 profile 불러오기")
    @GetMapping("/profile-load")
    public String profileLoad(@RequestParam Long userNo)
    {
        return s3Service.profileLoad(userNo);
    }


}
