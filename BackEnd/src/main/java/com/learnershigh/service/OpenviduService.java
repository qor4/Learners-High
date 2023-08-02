//package com.learnershigh.service;
//
//import com.learnershigh.controller.OpenViduController;
//import io.openvidu.java.client.*;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import io.openvidu.java.client.Connection;
//import io.openvidu.java.client.ConnectionProperties;
//import io.openvidu.java.client.OpenVidu;
//import io.openvidu.java.client.OpenViduHttpException;
//import io.openvidu.java.client.OpenViduJavaClientException;
//import io.openvidu.java.client.Session;
//import io.openvidu.java.client.SessionProperties;
//import org.springframework.stereotype.Service;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class OpenviduService {
//    public static final Logger logger = LoggerFactory.getLogger(OpenviduService.class);
//
//    @Value("${OPENVIDU_URL}")
//    private String OPENVIDU_URL;
//
//    @Value("${OPENVIDU_SECRET}")
//    private String OPENVIDU_SECRET;
//
//    private OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);;
//    public Map<String, Object> createSession(Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        Map<String, Object> check = new HashMap<>();
//
//        logger.info("*** createSession 메소드 호출");
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//        logger.info("*** createSession 메소드 종료");
//
//        logger.info("*** SessionId save 메소드 호출");
//        /*
//            여기서 sessionId를 DB에 저장
//         */
//        logger.info("*** SessionId save 메소드 종료");
//
//        check.put("msg", "success");
//        check.put("sessionId", session.getSessionId());
//
//        logger.info("*** createSession 메소드 종료");
//
//        return check;
//    }
//
//    public Map<String, Object> createConnection(Map<String, Object> params,String sessionId)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        Map<String, Object> check = new HashMap<>();
//
//        logger.info("*** createConnection 메소드 호출");
//
//        logger.info("*** getSessionId 메소드 호출");
//        /*
//            DB에서 해당 수업 회차에 대한 sessionID 가져오기
//         */
//        logger.info("*** getSessionId 메소드 종료");
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            // 세션이 없다
//            check.put("msg","fail");
//            logger.info("*** getActiveSession 메소드 오류");
//            return null;
//        } else {
//            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
//            Connection connection = session.createConnection(properties);
//            try {
//                logger.info("*** getMeeting 호출");
//                session.forceUnpublish(sessionId);
//                if(meetingDto.getNumberOfPeople() >= 2) {
//                    // 세션 방에 인원이 2명 이상이면 입장 안됨.
//
//                    check.put("msg", "The session room is full.");
//                    logger.info("*** createConnection 오류 - 방 인원이 가득 참");
//                    return check;
//                } else {
//                    meetingDto.setNumberOfPeople(meetingDto.getNumberOfPeople() + 1);
//                    meetingService.updateMeeting(meetingDto);
//
//                    check.put("msg", "success");
//                    check.put("sessionId", session.getSessionId());
//                    check.put("token", connection.getToken());
//
//                    logger.info("*** createConnection 종료");
//                    logger.info("*** sessionId : {}", session.getSessionId());
//                    logger.info("*** token : {}", connection.getToken());
//                    return check;
//                }
//            } catch (Exception e) {
//                return null;
//            }
//        }
//    }
//}
