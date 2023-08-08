package com.learnershigh.service.etc;

import com.learnershigh.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
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

            System.out.println("ss");
        }
        return sseEmitter;
    }

    public void Request(String fromUserId, String toUserId) {
        Optional<SseEmitter> sseEmitter = emitterRepository.get(toUserId);
        if (sseEmitter.isPresent()) {
            try {
                sseEmitter.get().send(SseEmitter.event().id(fromUserId).name("Request")
                        .data(fromUserId + "님께서 " + toUserId + "님께 알림을 보냈습니다."));
            } catch (IOException exception) {
                // IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
                emitterRepository.delete(toUserId);
            }
        } else {
            System.out.println("else");
        }
    }
}





