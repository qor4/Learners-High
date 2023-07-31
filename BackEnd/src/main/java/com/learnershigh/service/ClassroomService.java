package com.learnershigh.service;

import com.learnershigh.domain.*;
import com.learnershigh.domain.Class;
import com.learnershigh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClassroomService {
    private final ClassRoundRepository classRoundRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final StudentClassListRepository studentClassListRepository;
    private final ClassAttendRepository classAttendRepository;

    @Transactional
    public void createClassroom(Long classNo, Long classRoundNo) {
        // sessionId classRoundNo에 업데이트
        // 수업 생성되면 해당 수업을 듣는 학생들 전체 출결 테이블에 생성
        Class classDomain = classRepository.findByClassNo(classNo);
        ClassRound classRound = classRoundRepository.findByClassRoundNo(classRoundNo);
        List<StudentClassList> studentClassLists = studentClassListRepository.findByClassNo(classNo);
        for (StudentClassList studentClassList : studentClassLists) {
            User user = userRepository.findByUserNo(studentClassList.getUserNo().getUserNo());
            ClassAttend classAttend = new ClassAttend();
            classAttend.setClassNo(classDomain);
            classAttend.setClassRoundNo(classRound);
            classAttend.setUserNo(user);
            classAttend.setClassAttendStatus("결석");
            classAttendRepository.save(classAttend);
        }
    }
    @Transactional
    public void enterClassroom(Long classNo, Long classRoundNo, Long userNo) {
        User user = userRepository.findByUserNo(userNo);
        Class classDomain = classRepository.findByClassNo(classNo);
        ClassRound classRound = classRoundRepository.findByClassRoundNo(classRoundNo);
        StudentClassList studentClassList = studentClassListRepository.findByClassNoAndUserNo(classDomain, user);
        if (studentClassList == null) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }

        // 토큰 값 리턴

        // 출석을 했었는지
        ClassAttend classAttend = classAttendRepository.findByClassRoundNoAndUserNo(classRound, user);
        if (classAttend.getClassAttendDatetime() == null) { // 처음 출석
            LocalDateTime classStartTime = classRound.getClassRoundStartDatetime();
            LocalDateTime classEndTime = classRound.getClassRoundEndDatetime();
            LocalDateTime now = LocalDateTime.now();
            classAttend.setClassAttendDatetime(now);
            if (now.isBefore(classStartTime)) { // 시작 시간보다 이전인 경우
                classAttend.setClassAttendStatus("출석");
            } else if (now.isAfter(classStartTime) && now.isBefore(classEndTime)) { // 시작 시간 이후, 종료 시간 이전인 경우
                classAttend.setClassAttendStatus("지각");
            } else {
                classAttend.setClassAttendStatus("결석");
            }
            classAttendRepository.save(classAttend);
        }

    }
}
