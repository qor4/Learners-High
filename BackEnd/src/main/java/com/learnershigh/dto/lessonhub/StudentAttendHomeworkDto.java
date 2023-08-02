package com.learnershigh.dto.lessonhub;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class StudentAttendHomeworkDto {
    // 유저 no
    private Long userNo;
    // 유저 이름
    private String userName;
    // 수업 회차 별 출결, 과제 정보
    private List<AttendHomeworkProjectionInterface> attendHomeworkList;
}
