package com.learnershigh.controller;

import com.learnershigh.dto.lessonhub.SaveWarningDto;
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

    @GetMapping(value = "/active/{lessonNo}/{studentId}/{studentStatus}")
    public void active(@PathVariable Long lessonNo,
                       @PathVariable String studentId,
                       @PathVariable Long studentStatus) {
        notificationService.isActive(lessonNo, studentId, studentStatus, true);
    }

    @GetMapping(value = "/disactive/{lessonNo}/{studentId}/{studentStatus}")
    public void disactive(@PathVariable Long lessonNo,
                          @PathVariable String studentId,
                          @PathVariable Long studentStatus) {
        notificationService.isActive(lessonNo, studentId, studentStatus, false);
    }

    @PostMapping(value = "/send")
    public void send(@RequestBody SaveWarningDto saveWarningDto) {
        warningService.saveWarning(saveWarningDto);
        notificationService.send(saveWarningDto);
    }

}
