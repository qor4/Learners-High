package com.learnershigh.dto.lessonhub;

public interface AttendHomeworkProjectionInterface {
    // 수업 회차 no
    Long getLessonRoundNo();

    // 수업 회차 출결 상태
    String getLessonAttendStatus();

    // 수업 회차 과제 상태
    String getHomeworkStatus();

    // 수업 과제 no
    Long getHomeworkNo();
}
