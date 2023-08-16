package com.learnershigh.service.etc;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lessonhub.SaveWarningDto;
import com.learnershigh.repository.EmitterRepository;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.user.UserRepository;
import com.learnershigh.service.lesson.LessonroomService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Service
public class NotificationService {
    private final static Long DEFAULT_TIMEOUT = 3600000L;
    private final static String NOTIFICATION_NAME = "notification";

    private final EmitterRepository emitterRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    public static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    public SseEmitter connectNotification(String userId) {
        // 새로운 SseEmitter를 만든다
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        // 유저 ID로 SseEmitter를 저장한다.
        emitterRepository.save(userId, sseEmitter);

        // 세션이 종료될 경우 저장한 SseEmitter를 삭제한다.
        sseEmitter.onCompletion(() -> emitterRepository.delete(userId));
        sseEmitter.onTimeout(() -> emitterRepository.delete(userId));

        // 503 Service Unavailable 오류가 발생하지 않도록 첫 데이터를 보낸다.
        try {
            sseEmitter.send(SseEmitter.event().id(userId).name("setting").data("Connection completed"));
        } catch (IOException exception) {
            logger.info("*** IOException 발생");
            throw new IllegalStateException("IOException");
        }
        return sseEmitter;
    }

    public void isActive(Long lessonNo, String studentId, Long status,boolean isActive) {
        Lesson lesson = lessonRepository.findByLessonNo(lessonNo);
        Optional<SseEmitter> sseEmitter = emitterRepository.get(lesson.getUserNo().getUserId());
        if (sseEmitter.isPresent()) {
            try {
                sseEmitter.get().send(SseEmitter.event().id(studentId).name("isActive")
                        .data("{").data("\"status\":" + status + ",")
                        .data("\"studentId\":\"" + studentId + "\",")
                        .data("\"isActive\":" + isActive)
                        .data("}"));
            } catch (IOException exception) {
                // IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
                emitterRepository.delete(lesson.getUserNo().getUserId());
                logger.info("*** IOException 발생 user.getUserId() emitter delete");
                throw new IllegalStateException("IOException");
            }
        } else {
            logger.info("*** No emitter found");
        }
    }

    public void send(SaveWarningDto saveWarningDto) {

        User user = userRepository.findByUserNo(saveWarningDto.getStudentNo());
        Optional<SseEmitter> sseEmitter = emitterRepository.get(user.getUserId());
        if (sseEmitter.isPresent()) {
            try {
                sseEmitter.get().send(SseEmitter.event().id(saveWarningDto.getTeacherId()).name("send")
                        .data("알림"));
            } catch (IOException exception) {
                // IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
                emitterRepository.delete(user.getUserId());
                logger.info("*** IOException 발생 user.getUserId() emitter delete");
                throw new IllegalStateException("IOException");
            }
        } else {
            logger.info("*** No emitter found");
        }
    }
}





