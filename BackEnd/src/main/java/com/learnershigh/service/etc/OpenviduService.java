package com.learnershigh.service.etc;

import org.springframework.beans.factory.annotation.Value;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
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
    public void createSession(Long lessonNo, Long lessonRoundNo)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String,String> params = new HashMap<>();
        params.put("customSessionId",lessonNo+"_"+lessonRoundNo);
        logger.info("*** createSession 메소드 호출");
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        logger.info("*** sessionId : " + session.getSessionId());
        logger.info("*** createSession 메소드 종료");
    }

    public String createConnection(Long lessonNo, Long lessonRoundNo)
            throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("*** createConnection 메소드 호출");
        String sessionId = lessonNo+"_"+lessonRoundNo;
        logger.info("*** sessionId : " + sessionId);
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            logger.info("*** getActiveSession 메소드 오류");
            throw new IllegalStateException("생성된 수업룸이 없습니다.");
        } else {
            ConnectionProperties properties = ConnectionProperties.fromJson(null).build();
            Connection connection = session.createConnection(properties);
            logger.info("*** createConnection 종료");
            return connection.getToken();
        }
    }
}
