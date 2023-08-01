package com.learnershigh.service;

import com.learnershigh.domain.*;
import com.learnershigh.domain.Class;
import com.learnershigh.dto.*;
import com.learnershigh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
add
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeacherService {
    private final ClassRoundRepository classRoundRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassHomeworkNoticeRepository classHomeworkNoticeRepository;
    private final StudentClassListRepository studentClassListRepository;
    private final ClassHomeworkRepository classHomeworkRepository;

    public HashMap<Integer, Object> showWeeklyClassSchedule(Long userNo) {
        HashMap<Integer, Object> data = new HashMap<>();
        for (int i = 1; i <= 7; i++) {
            List<ClassRound> classRoundList = classRoundRepository.getWeeklyClassRoundByTeacher(userNo, Integer.toString(i));
            List<MainClassListDto> mainClassListDtoList = new ArrayList<>();
            for (ClassRound classRound : classRoundList) {
                MainClassListDto mainClassListDto = new MainClassListDto();
                mainClassListDto.setClassRoundNo(classRound.getClassRoundNo());
                mainClassListDto.setClassNo(classRound.getClassNo().getClassNo());
                mainClassListDto.setUserNo(classRound.getClassNo().getUserNo().getUserNo());
                mainClassListDto.setUserName(classRound.getClassNo().getUserNo().getUserName());
                mainClassListDto.setClassName(classRound.getClassNo().getClassName());
                mainClassListDto.setClassRoundNumber(classRound.getClassRoundNumber());
                mainClassListDto.setClassRoundTitle(classRound.getClassRoundTitle());
                mainClassListDto.setClassRoundFileName(classRound.getClassRoundFileName());
                mainClassListDto.setClassRoundFileOriginName(classRound.getClassRoundFileOriginName());
                mainClassListDto.setClassRoundStartDatetime(classRound.getClassRoundStartDatetime());
                mainClassListDto.setClassRoundEndDatetime(classRound.getClassRoundEndDatetime());
                mainClassListDto.setHomework(classRound.isHomework());
                mainClassListDto.setClassRoundClassroom(classRound.getClassRoundClassroom());
                mainClassListDtoList.add(mainClassListDto);
            }
            data.put(i, mainClassListDtoList);
        }
        return data;
    }

    public List<ClassListDto> teacherClassList(Long userNo, String status) {
        List<Class> classList = new ArrayList<>();
        List<ClassListDto> classListDtoList = new ArrayList<>();
        if (status.equals("전체")) { // 상태를 선택하지 않았을 경우
            User user = userRepository.findByUserNo(userNo);
            if (user == null) {
                throw new IllegalStateException("유효하지 않은 사용자입니다.");
            }
            classList = classRepository.findByUserNo(user);

        } else if (status.equals("강의 종료")) { // 상태가 강의 종료일 경우
            // 별점 포함 목록 출력
        } else if (status.equals("강의 중") || status.equals("강의 전")) { // 상태가 강의 전, 강의 중일경우
            classList = classRepository.teacherClassList(userNo, status);
        }

        for (Class classDomain : classList) {
            ClassListDto classListDto = new ClassListDto();
            classListDto.setClassNo(classDomain.getClassNo());
            classListDto.setUserNo(classDomain.getUserNo().getUserNo());
            classListDto.setUserName(classDomain.getUserNo().getUserName());
            classListDto.setClassTypeNo(classDomain.getClassTypeNo().getClassTypeNo());
            classListDto.setClassTypeName(classDomain.getClassTypeNo().getClassTypeName());
            classListDto.setClassName(classDomain.getClassName());
            classListDto.setClassStartDate(classDomain.getClassStartDate());
            classListDto.setClassEndDate(classDomain.getClassEndDate());
            classListDto.setMaxStudent(classDomain.getMaxStudent());
            classListDto.setClassPrice(classDomain.getClassPrice());
            classListDto.setClassThumbnailImg(classDomain.getClassThumbnailImg());
            classListDtoList.add(classListDto);
        }
        return classListDtoList;
    }

    @Transactional
    public void joinHomeworkNotice(HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        Class classDomain = classRepository.findByClassNoAndUserNo(homeworkNoticeJoinDto.getClassNo(), userRepository.findByUserNo(homeworkNoticeJoinDto.getUserNo()));
        ClassRound classRound = classRoundRepository.findByClassRoundNo(homeworkNoticeJoinDto.getClassRoundNo());
        if (classDomain == null) {
            throw new IllegalStateException("수업 정보와 사용자 정보가 일치하지 않습니다.");
        }
        // 과제 정보 등록
        ClassHomeworkNotice classHomeworkNotice = new ClassHomeworkNotice();
        classHomeworkNotice.setHomeworkNoticeTitle(homeworkNoticeJoinDto.getHomeworkNoticeTitle());
        classHomeworkNotice.setHomeworkNoticeContent(homeworkNoticeJoinDto.getHomeworkNoticeContent());
        classHomeworkNotice.setClassRoundNo(classRound);
        ClassHomeworkNotice saveHomeworkNotice = classHomeworkNoticeRepository.save(classHomeworkNotice);
        // 학생들을 과제 등록
        List<StudentClassList> studentClassLists = studentClassListRepository.findByClassNo(homeworkNoticeJoinDto.getClassNo());
        for (StudentClassList studentClassList : studentClassLists) {
            ClassHomework classHomework = new ClassHomework();
            User user = userRepository.findByUserNo(studentClassList.getUserNo().getUserNo());
            classHomework.setClassNo(classDomain);
            classHomework.setClassRoundNo(classRound);
            classHomework.setUserNo(user);
            classHomework.setClassHomeworkNoticeNo(saveHomeworkNotice);
            classHomework.setHomeworkStatus("미제출");
            classHomeworkRepository.save(classHomework);
        }
    }

    public List<StudentAttendHomeworkDto> getStudentTabInfo(Long classNo) {
        // 강의를 수강하는 학생 List
        List<StudentClassList> studentClassLists = studentClassListRepository.findByClassNo(classNo);
        List<StudentAttendHomeworkDto> studentAttendHomeworkDtoList = new ArrayList<>();
        for (StudentClassList studentClassList : studentClassLists) {
            StudentAttendHomeworkDto studentAttendHomeworkDto = new StudentAttendHomeworkDto();
            studentAttendHomeworkDto.setUserNo(studentClassList.getUserNo().getUserNo());
            studentAttendHomeworkDto.setUserName(studentClassList.getUserNo().getUserName());
            // userNo를 사용해 출석, 과제 정보 조회 후 set => for문, 그리고 정렬(수업 회차 기준)
            List<AttendHomeworkProjectionInterface> attendHomeworkDtoList = classHomeworkRepository.getAttendHomeworkByUserNo(studentClassList.getUserNo().getUserNo(), classNo);
            System.out.println(studentClassList.getUserNo().getUserNo() + " " + classNo);
            studentAttendHomeworkDto.setAttendHomeworkList(attendHomeworkDtoList);
            studentAttendHomeworkDtoList.add(studentAttendHomeworkDto);
        }
        return studentAttendHomeworkDtoList;
    }
}
