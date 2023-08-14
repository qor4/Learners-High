package com.learnershigh.controller;

import com.learnershigh.service.etc.NotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
@Api(tags = {"알림에 대한 API"})
@CrossOrigin("*")
public class NotificationController {


    private final NotificationService notificationService;

    // 이벤트 생성
    @GetMapping(value = "/subscribe/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable String id,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return notificationService.connectNotification(id);
//        return notificationService.connectNotification(id, lastEventId);
    }

    @GetMapping(value = "/active/{lessonNo}/{studentId}")
    public void active(@PathVariable Long lessonNo,
                        @PathVariable String studentId) {
        notificationService.isActive(lessonNo, studentId, true);
    }

    @GetMapping(value = "/disactive/{lessonNo}/{studentId}")
    public void disactive(@PathVariable Long lessonNo,
                        @PathVariable String studentId) {
        notificationService.isActive(lessonNo, studentId, false);
    }

    @GetMapping(value = "/{teacherId}/{studentNo}")
    public void send(@PathVariable String teacherId,
                        @PathVariable Long studentNo) {
        notificationService.send(teacherId, studentNo);
    }

}
