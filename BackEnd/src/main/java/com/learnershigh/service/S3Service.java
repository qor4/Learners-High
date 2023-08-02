package com.learnershigh.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.learnershigh.domain.Class;
import com.learnershigh.domain.ClassHomework;
import com.learnershigh.domain.ClassRound;
import com.learnershigh.domain.User;
import com.learnershigh.repository.ClassHomeworkRepository;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.ClassRoundRepository;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional(readOnly = true)
public class S3Service {
    //
    private final AmazonS3 amazonS3;
    private final ClassHomeworkRepository classHomeworkRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassRoundRepository classRoundRepository;
    //
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${s3.learnershigh.url}")
    private String URL;


    // 수업 썸네일 DB와 S3에 모두 저장
    @Transactional
    public String thumbnailUploadToAWS(MultipartFile file, String dirName, Long classNo) {
        String key = dirName + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        String originName = file.getOriginalFilename();

        System.out.println("key: " + key);  // ---> 키를 넣어놓기

        System.out.println(file.getOriginalFilename()); // ---> origin name 에 넣어놓기
        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크

            amazonS3.getUrl(bucket, key).toString();


            PutObjectResult result = amazonS3.putObject(request);


            Class cla = classRepository.findByClassNo(classNo);

            cla.setClassThumbnailImg(key);

            classRepository.save(cla);

            return key;
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }

    // 수업 회차마다 수업 자료를 DB와 S3에 모두 저장
    @Transactional
    public String dataUploadToAWS(MultipartFile file, String dirName, Long classRoundNo) {
        String key = dirName + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        String originName = file.getOriginalFilename();

        System.out.println("key: " + key);  // ---> 키를 넣어놓기

        System.out.println(file.getOriginalFilename()); // ---> origin name 에 넣어놓기
        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크

            amazonS3.getUrl(bucket, key).toString();


            PutObjectResult result = amazonS3.putObject(request);

            ClassRound classRound = classRoundRepository.findByClassRoundNo(classRoundNo);

            classRound.setClassRoundFileName(key);
            classRound.setClassRoundFileOriginName(originName);

            classRoundRepository.save(classRound);

            return key;
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }


    //  수업 회차마다 과제파일을 DB와 S3에 모두 저장
    @Transactional
    public String homeworkUploadToAWS(MultipartFile file, String dirName, Long classHomeworkNo) {
        String key = dirName + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        String originName = file.getOriginalFilename();

        System.out.println("key: " + key);  // ---> 키를 넣어놓기

        System.out.println(file.getOriginalFilename()); // ---> origin name 에 넣어놓기
        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크

            amazonS3.getUrl(bucket, key).toString();


            PutObjectResult result = amazonS3.putObject(request);

            ClassHomework classHomework = classHomeworkRepository.findByClassHomeworkNo(classHomeworkNo);

            classHomework.setHomeworkFileName(key);
            classHomework.setHomeworkFileOriginName(originName);
            classHomework.setHomeworkStatus("제출");
            classHomework.setHomeworkSubmissionDatetime(LocalDateTime.now());

            classHomeworkRepository.save(classHomework);

            return key;
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }


    // 회원가입시 프로필사진을 DB와 S3에 모두 저장
    @Transactional
    public String profileUploadToAWS(MultipartFile file, String dirName, Long userNo) {
        String key = dirName + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        String originName = file.getOriginalFilename();

        System.out.println("key: " + key);  // ---> 키를 넣어놓기

        System.out.println(file.getOriginalFilename()); // ---> origin name 에 넣어놓기
        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크

            amazonS3.getUrl(bucket, key).toString();


            PutObjectResult result = amazonS3.putObject(request);

            User user = userRepository.findByUserNo(userNo);

            user.setProfileImg(key);

            userRepository.save(user);


            return key;
        } catch (AmazonServiceException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            log.error("uploadToAWS AmazonServiceException filePath={}, yyyymm={}, error={}", e.getMessage());
        } catch (SdkClientException e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        } catch (Exception e) {
            // Amazon S3 couldn't be contacted for a response, or the client
            // couldn't parse the response from Amazon S3.
            log.error("uploadToAWS SdkClientException filePath={}, error={}", e.getMessage());
        }

        return "";
    }


//----------------------------------------------------------------------------------------------------------------

    // 학생이 올린 과제 다운로드
    public boolean homeworkDownload(Long classHomeworkNo, HttpServletRequest request, HttpServletResponse
            response) {
        ClassHomework classHomework = classHomeworkRepository.findByClassHomeworkNo(classHomeworkNo);
        System.out.println("서비스 다운로드");

        // origin name
        String originName = classHomework.getHomeworkFileOriginName();
        System.out.println(classHomework.getHomeworkFileOriginName());

        // s3file name
        String s3FileName = classHomework.getHomeworkFileName();
        System.out.println(classHomework.getHomeworkFileName());

        if (s3FileName == null) {
            return false;
        }
        S3Object fullObject = null;
        try {
            fullObject = amazonS3.getObject(bucket, s3FileName);
            if (fullObject == null) {
                return false;
            }
        } catch (AmazonS3Exception e) {
            throw new IllegalStateException("다운로드 파일이 존재하지 않습니다.");
        }

        OutputStream os = null;
        FileInputStream fis = null;
        boolean success = false;
        try {
            S3ObjectInputStream objectInputStream = fullObject.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectInputStream);

            String fileName = null;
            if (originName != null) {
                //fileName= URLEncoder.encode(downloadFileName, "UTF-8").replaceAll("\\+", "%20");
                fileName = getEncodedFilename(request, originName);
            } else {
                fileName = getEncodedFilename(request, s3FileName); // URLEncoder.encode(fileKey, "UTF-8").replaceAll("\\+", "%20");
            }

            response.setContentType("application/octet-stream;charset=UTF-8");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
            response.setHeader("Content-Length", String.valueOf(fullObject.getObjectMetadata().getContentLength()));
            response.setHeader("Set-Cookie", "fileDownload=true; path=/");
            FileCopyUtils.copy(bytes, response.getOutputStream());
            success = true;
        } catch (IOException e) {
            log.debug(e.getMessage(), e);
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                log.debug(e.getMessage(), e);
            }
            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                log.debug(e.getMessage(), e);
            }
        }
        return success;
    }


    // 강사가 올린 학습자료 다운로드
    public boolean dataDownload(Long classRoundNo, HttpServletRequest request, HttpServletResponse
            response) {
        ClassRound classRound = classRoundRepository.findByClassRoundNo(classRoundNo);
        System.out.println("서비스 다운로드");

        // origin name
        String originName = classRound.getClassRoundFileOriginName();
        System.out.println(classRound.getClassRoundFileOriginName());

        // s3file name
        String s3FileName = classRound.getClassRoundFileName();
        System.out.println(classRound.getClassRoundFileName());

        if (s3FileName == null) {
            return false;
        }
        S3Object fullObject = null;
        try {
            fullObject = amazonS3.getObject(bucket, s3FileName);
            if (fullObject == null) {
                return false;
            }
        } catch (AmazonS3Exception e) {
            throw new IllegalStateException("다운로드 파일이 존재하지 않습니다.");
        }

        OutputStream os = null;
        FileInputStream fis = null;
        boolean success = false;
        try {
            S3ObjectInputStream objectInputStream = fullObject.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectInputStream);

            String fileName = null;
            if (originName != null) {
                //fileName= URLEncoder.encode(downloadFileName, "UTF-8").replaceAll("\\+", "%20");
                fileName = getEncodedFilename(request, originName);
            } else {
                fileName = getEncodedFilename(request, s3FileName); // URLEncoder.encode(fileKey, "UTF-8").replaceAll("\\+", "%20");
            }

            response.setContentType("application/octet-stream;charset=UTF-8");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
            response.setHeader("Content-Length", String.valueOf(fullObject.getObjectMetadata().getContentLength()));
            response.setHeader("Set-Cookie", "fileDownload=true; path=/");
            FileCopyUtils.copy(bytes, response.getOutputStream());
            success = true;
        } catch (IOException e) {
            log.debug(e.getMessage(), e);
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                log.debug(e.getMessage(), e);
            }
            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                log.debug(e.getMessage(), e);
            }
        }
        return success;
    }


    //
//    /**/
//     * 파일명이 한글인 경우 URL encode이 필요함.
//     * @param request
//     * @param displayFileName
//     * @return
//     * @throws UnsupportedEncodingException
//    *
//     */
    @Transactional
    public String getEncodedFilename(HttpServletRequest request, String displayFileName) throws UnsupportedEncodingException {
        String header = request.getHeader("User-Agent");

        String encodedFilename = null;
        if (header.indexOf("MSIE") > -1) {
            encodedFilename = URLEncoder.encode(displayFileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (header.indexOf("Trident") > -1) {
            encodedFilename = URLEncoder.encode(displayFileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (header.indexOf("Chrome") > -1) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < displayFileName.length(); i++) {
                char c = displayFileName.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else if (header.indexOf("Opera") > -1) {
            encodedFilename = "\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (header.indexOf("Safari") > -1) {
            encodedFilename = URLDecoder.decode("\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"", "UTF-8");
        } else {
            encodedFilename = URLDecoder.decode("\"" + new String(displayFileName.getBytes("UTF-8"), "8859_1") + "\"", "UTF-8");
        }
        return encodedFilename;

    }


    /**
     * file 삭제
     *
     * @param fileKey
     */
    public void delete(String fileKey) {
        amazonS3.deleteObject(bucket, fileKey);
    }


    // 수업 썸네일 이미지 업로드
    public String thumbnailLoad(Long classNo) {
        Class cla = classRepository.findByClassNo(classNo);

        return "URL" + cla.getClassThumbnailImg();

    }

    // 수업 썸네일 이미지 업로드
    public String profileLoad(Long userNo) {

        User user = userRepository.findByUserNo(userNo);
        return "URL" + user.getProfileImg();

    }
}





