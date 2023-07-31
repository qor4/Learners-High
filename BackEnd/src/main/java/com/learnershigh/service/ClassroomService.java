package com.learnershigh.service;

import com.learnershigh.domain.*;
import com.learnershigh.domain.Class;
import com.learnershigh.dto.AttendHomeworkDto;
import com.learnershigh.dto.ClassListDto;
import com.learnershigh.dto.MainClassListDto;
import com.learnershigh.dto.StudentAttendHomeworkDto;
import com.learnershigh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
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
}
