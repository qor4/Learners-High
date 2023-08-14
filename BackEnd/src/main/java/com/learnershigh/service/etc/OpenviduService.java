package com.learnershigh.service.etc;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.user.User;
import com.learnershigh.repository.lesson.LessonRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OpenviduService {
    public static final Logger logger = LoggerFactory.getLogger(OpenviduService.class);
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    public String createLessonRoom(Long lessonNo, Long lessonRoundNo,Long teacherNo)
            throws OpenViduJavaClientException, OpenViduHttpException, InterruptedException {
        logger.info("*** createLessonRoom 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        Map<String,String> params = new HashMap<>();
        params.put("customSessionId",sessionId);
        SessionProperties properties = SessionProperties.fromJson(params).build();


        Session session= null;
        int cnt =0;
        while(cnt < 10){
            try {
                session = openvidu.getActiveSession(sessionId);
                if(session != null){
                    session.close();
                    logger.info("*** session close");
                    break;
                }
            }catch (Exception e) {
                logger.info("*** getActiveSession 메소드 중..."+cnt);
            }
            Thread.sleep(300);
            cnt++;
        }

        logger.info("*** createSession 메소드 실행");
        session = null;
        cnt =0;
        while(session == null && cnt < 10){
            try {
                session = this.openvidu.createSession(properties);
            }catch (Exception e) {
                logger.info("*** createSession 메소드 중..."+cnt);
            }
            Thread.sleep(500);
            cnt++;
        }
        logger.info("*** createSession 메소드 종료");

        logger.info("*** getActiveSession 메소드 종료");
        logger.info("*** connectionProperties build");
        ConnectionProperties connectionProperties
                = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .build();
        logger.info("*** connectionProperties build 종료");

        logger.info("*** connectionProperties createConnection 호출");
        cnt =0;
        Connection connection = null;
        while(connection == null  && cnt < 10){
            try {
                connection = session.createConnection(connectionProperties);
            }catch (Exception e) {
                logger.info("*** createConnection 메소드 중..."+cnt);
            }
            Thread.sleep(300);
            cnt++;
        }
        if(connection == null){
            logger.info("*** createConnection 메소드 오류");
            throw new IllegalStateException("연결에 실패 했습니다.");
        }
        logger.info("*** connectionProperties createConnection 종료");
        logger.info("*** sessionId : " + session.getSessionId());
        logger.info("*** createLessonRoom 메소드 종료");
        return connection.getToken();
    }




    public String EnterLessonRoom(Long lessonNo, Long lessonRoundNo,Long studentNo)
            throws OpenViduJavaClientException, OpenViduHttpException, InterruptedException {
        logger.info("*** createConnection 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        logger.info("*** sessionId : " + sessionId);
        Session session= null;
        int cnt =0;
        while(session == null && cnt < 10){
            try {
                session = openvidu.getActiveSession(sessionId);
            }catch (Exception e) {
                logger.info("*** getActiveSession 메소드 중..."+cnt);
            }
            Thread.sleep(1000);
            cnt++;
        }

        if (session == null) {
            logger.info("*** getActiveSession 메소드 오류");
            throw new IllegalStateException("생성된 수업룸이 없습니다.");
        }

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                    .type(ConnectionType.WEBRTC)
                    .role(OpenViduRole.PUBLISHER)
                    .build();
        Connection connection = null;
        cnt = 0;
        while(connection == null && cnt < 10){
            try {
                connection = session.createConnection(connectionProperties);
            }catch (Exception e) {
                logger.info("*** createConnection 메소드 중..."+cnt);
            }
            Thread.sleep(1000);
            cnt++;
        }

        if(connection == null) {
            logger.info("*** createConnection 메소드 오류");
            throw new IllegalStateException("연결에 실패 했습니다.");
        }
        logger.info("*** createConnection 종료");
        return connection.getToken();
    }

    public void deleteLessonRoom(Long lessonNo, Long lessonRoundNo,Long teacherNo)
            throws OpenViduJavaClientException, OpenViduHttpException, InterruptedException {
        logger.info("*** deleteLessonRoom 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        logger.info("*** " + sessionId + " session close 시작");

        Session session = null;
        int cnt = 0;
        while(session == null && cnt < 5){
            session = this.openvidu.getActiveSession(sessionId);
            Thread.sleep(1000);
            cnt++;
        }
        if(session == null){
            logger.info("*** "+sessionId+" session is null");
            return;
        }
        try{
            session.close();
            logger.info("*** "+sessionId+" session close");
        }catch (Exception e){
            logger.info("*** "+sessionId+" session is null");
        }
        logger.info("*** deleteLessonRoom 메소드 종료");
    }

}
