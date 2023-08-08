package com.learnershigh.controller;

import com.learnershigh.service.etc.NotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/notification")
@Api(tags = {"알림에 대한 API"})
@CrossOrigin("*")
public class NotificationController {


    private final NotificationService notificationService;


    @GetMapping(value = "/subscribe/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable String id,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return notificationService.connectNotification(id);
//        return notificationService.connectNotification(id, lastEventId);
    }

    @GetMapping(value = "/{teacherId}/{studentId}")
    public void request(@PathVariable String teacherId,
                                @PathVariable String studentId) {
        notificationService.Request(teacherId, studentId);
    }


}
