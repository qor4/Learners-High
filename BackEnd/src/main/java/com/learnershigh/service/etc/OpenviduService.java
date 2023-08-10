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
            throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("*** createLessonRoom 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        Map<String,String> params = new HashMap<>();
        params.put("customSessionId",sessionId);
        SessionProperties properties = SessionProperties.fromJson(params).build();

        logger.info("*** getActiveSession 메소드 호출");
        try{
            openvidu.getActiveSession(sessionId).close();
            logger.info("*** "+sessionId+" session close");
        }catch (Exception e){
            logger.info("*** "+sessionId+" session is null");
        }

        logger.info("*** createSession 메소드 실행");
        Session session = this.openvidu.createSession(properties);
        logger.info("*** createSession 메소드 종료");

        logger.info("*** getActiveSession 메소드 종료");
        logger.info("*** connectionProperties build");
        ConnectionProperties connectionProperties
                = new ConnectionProperties.Builder()
                                          .type(ConnectionType.WEBRTC)
                                          .role(OpenViduRole.PUBLISHER)
                                          .data(String.valueOf(teacherNo))
                                          .build();
        logger.info("*** connectionProperties build 종료");

        logger.info("*** connectionProperties createConnection 호출");
        Connection connection = session.createConnection(connectionProperties);
        logger.info("*** connectionProperties createConnection 종료");

        logger.info("*** sessionId : " + session.getSessionId());
        logger.info("*** createLessonRoom 메소드 종료");
        return connection.getToken();
    }
    public void deleteLessonRoom(Long lessonNo, Long lessonRoundNo,Long teacherNo)
            throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("*** deleteLessonRoom 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        logger.info("*** " + sessionId + " session close 시작");
        try{
            openvidu.getActiveSession(sessionId).close();
            logger.info("*** "+sessionId+" session close");
        }catch (Exception e){
            logger.info("*** "+sessionId+" session is null");
        }
        logger.info("*** deleteLessonRoom 메소드 종료");
    }



    public String EnterLessonRoom(Long lessonNo, Long lessonRoundNo,Long studentNo)
            throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("*** createConnection 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        logger.info("*** sessionId : " + sessionId);

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            logger.info("*** getActiveSession 메소드 오류");
            throw new IllegalStateException("생성된 수업룸이 없습니다.");
        } else {
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                    .type(ConnectionType.WEBRTC)
                    .role(OpenViduRole.PUBLISHER)
                    .data(String.valueOf(studentNo))
                    .build();
            try{
                Connection connection = session.createConnection(connectionProperties);
                logger.info("*** createConnection 종료");
                return connection.getToken();
            }catch (Exception e){
                e.printStackTrace();
                logger.info("*** createConnection 메소드 오류");
                throw new IllegalStateException("생성된 수업룸이 없습니다.");
            }
        }
    }
}
