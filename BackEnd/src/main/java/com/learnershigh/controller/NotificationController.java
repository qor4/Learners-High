package com.learnershigh.controller;

import com.learnershigh.service.etc.NotificationService;
import com.learnershigh.service.lessonhub.WarningService;
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
    private final WarningService warningService;

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

    @GetMapping(value = "/{lessonNo}/{lessonRoundNo}/{teacherId}/{studentNo}")
    public void send(@PathVariable Long lessonNo, @PathVariable Long lessonRoundNo, @PathVariable String teacherId,
                     @PathVariable Long studentNo) {
        warningService.saveWarning(lessonNo, lessonRoundNo, studentNo);
        notificationService.send(teacherId, studentNo);
    }

}
