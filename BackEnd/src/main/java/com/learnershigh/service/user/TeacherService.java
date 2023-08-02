package com.learnershigh.service.user;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonHomeworkNotice;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.LessonHomework;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lesson.LessonMainListDto;
import com.learnershigh.dto.lessonhub.*;
import com.learnershigh.dto.user.TeacherProfileDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkNoticeRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeacherService {
    private final LessonRoundRepository lessonRoundRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final LessonHomeworkNoticeRepository lessonHomeworkNoticeRepository;
    private final StudentLessonListRepository studentLessonListRepository;
    private final LessonHomeworkRepository lessonHomeworkRepository;

    public HashMap<Integer, Object> showWeeklyLessonSchedule(Long userNo) {
        HashMap<Integer, Object> data = new HashMap<>();
        for (int i = 1; i <= 7; i++) {
            List<LessonRound> lessonRoundList = lessonRoundRepository.getWeeklyLessonRoundByTeacher(userNo, Integer.toString(i));
            List<LessonMainListDto> lessonListDtoMainList = new ArrayList<>();
            for (LessonRound lessonRound : lessonRoundList) {
                LessonMainListDto lessonMainListDto = new LessonMainListDto();
                lessonMainListDto.setLessonRoundNo(lessonRound.getLessonRoundNo());
                lessonMainListDto.setLessonNo(lessonRound.getLessonNo().getLessonNo());
                lessonMainListDto.setUserNo(lessonRound.getLessonNo().getUserNo().getUserNo());
                lessonMainListDto.setUserName(lessonRound.getLessonNo().getUserNo().getUserName());
                lessonMainListDto.setLessonName(lessonRound.getLessonNo().getLessonName());
                lessonMainListDto.setLessonRoundNumber(lessonRound.getLessonRoundNumber());
                lessonMainListDto.setLessonRoundTitle(lessonRound.getLessonRoundTitle());
                lessonMainListDto.setLessonRoundFileName(lessonRound.getLessonRoundFileName());
                lessonMainListDto.setLessonRoundFileOriginName(lessonRound.getLessonRoundFileOriginName());
                lessonMainListDto.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
                lessonMainListDto.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
                lessonMainListDto.setHomework(lessonRound.isHomework());
                lessonMainListDto.setLessonRoundLessonroom(lessonRound.getLessonRoundLessonroom());
                lessonListDtoMainList.add(lessonMainListDto);
            }
            data.put(i, lessonListDtoMainList);
        }
        return data;
    }

    public List<LessonListDto> teacherLessonList(Long userNo, String status) {
        List<Lesson> lessonList = new ArrayList<>();
        List<LessonListDto> lessonListDtoList = new ArrayList<>();
        if (status.equals("전체")) { // 상태를 선택하지 않았을 경우
            User user = userRepository.findByUserNo(userNo);
            if (user == null) {
                throw new IllegalStateException("유효하지 않은 사용자입니다.");
            }
            lessonList = lessonRepository.findByUserNo(user);

        } else if (status.equals("강의 종료")) { // 상태가 강의 종료일 경우
            // 별점 포함 목록 출력
        } else if (status.equals("강의 중") || status.equals("강의 전")) { // 상태가 강의 전, 강의 중일경우
            lessonList = lessonRepository.teacherLessonList(userNo, status);
        }

        for (Lesson lessonDomain : lessonList) {
            LessonListDto lessonListDto = new LessonListDto();
            lessonListDto.setLessonNo(lessonDomain.getLessonNo());
            lessonListDto.setUserNo(lessonDomain.getUserNo().getUserNo());
            lessonListDto.setUserName(lessonDomain.getUserNo().getUserName());
            lessonListDto.setLessonTypeNo(lessonDomain.getLessonTypeNo().getLessonTypeNo());
            lessonListDto.setLessonTypeName(lessonDomain.getLessonTypeNo().getLessonTypeName());
            lessonListDto.setLessonName(lessonDomain.getLessonName());
            lessonListDto.setLessonStartDate(lessonDomain.getLessonStartDate());
            lessonListDto.setLessonEndDate(lessonDomain.getLessonEndDate());
            lessonListDto.setMaxStudent(lessonDomain.getMaxStudent());
            lessonListDto.setLessonPrice(lessonDomain.getLessonPrice());
            lessonListDto.setLessonThumbnailImg(lessonDomain.getLessonThumbnailImg());
            lessonListDtoList.add(lessonListDto);
        }
        return lessonListDtoList;
    }

    @Transactional
    public void joinHomeworkNotice(HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        Lesson lessonDomain = lessonRepository.findByLessonNoAndUserNo(homeworkNoticeJoinDto.getLessonNo(), userRepository.findByUserNo(homeworkNoticeJoinDto.getUserNo()));
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(homeworkNoticeJoinDto.getLessonRoundNo());
        if (lessonDomain == null) {
            throw new IllegalStateException("수업 정보와 사용자 정보가 일치하지 않습니다.");
        }
        // 과제 정보 등록
        LessonHomeworkNotice lessonHomeworkNotice = new LessonHomeworkNotice();
        lessonHomeworkNotice.setHomeworkNoticeTitle(homeworkNoticeJoinDto.getHomeworkNoticeTitle());
        lessonHomeworkNotice.setHomeworkNoticeContent(homeworkNoticeJoinDto.getHomeworkNoticeContent());
        lessonHomeworkNotice.setLessonRoundNo(lessonRound);
        LessonHomeworkNotice saveHomeworkNotice = lessonHomeworkNoticeRepository.save(lessonHomeworkNotice);
        // 학생들을 과제 등록
        List<StudentLessonList> studentLessonLists = studentLessonListRepository.findByLessonNo(homeworkNoticeJoinDto.getLessonNo());
        for (StudentLessonList studentLessonList : studentLessonLists) {
            LessonHomework lessonHomework = new LessonHomework();
            User user = userRepository.findByUserNo(studentLessonList.getUserNo().getUserNo());
            lessonHomework.setLessonNo(lessonDomain);
            lessonHomework.setLessonRoundNo(lessonRound);
            lessonHomework.setUserNo(user);
            lessonHomework.setLessonHomeworkNoticeNo(saveHomeworkNotice);
            lessonHomework.setHomeworkStatus("미제출");
            lessonHomeworkRepository.save(lessonHomework);
        }
    }

    public List<StudentAttendHomeworkDto> getStudentTabInfo(Long lessonNo) {
        // 강의를 수강하는 학생 List
        List<StudentLessonList> studentLessonLists = studentLessonListRepository.findByLessonNo(lessonNo);
        List<StudentAttendHomeworkDto> studentAttendHomeworkDtoList = new ArrayList<>();
        for (StudentLessonList studentLessonList : studentLessonLists) {
            StudentAttendHomeworkDto studentAttendHomeworkDto = new StudentAttendHomeworkDto();
            studentAttendHomeworkDto.setUserNo(studentLessonList.getUserNo().getUserNo());
            studentAttendHomeworkDto.setUserName(studentLessonList.getUserNo().getUserName());
            // userNo를 사용해 출석, 과제 정보 조회 후 set => for문, 그리고 정렬(수업 회차 기준)
            List<AttendHomeworkProjectionInterface> attendHomeworkDtoList = lessonHomeworkRepository.getAttendHomeworkByUserNo(studentLessonList.getUserNo().getUserNo(), lessonNo);
            studentAttendHomeworkDto.setAttendHomeworkList(attendHomeworkDtoList);
            studentAttendHomeworkDtoList.add(studentAttendHomeworkDto);
        }
        return studentAttendHomeworkDtoList;
    }

    public String getInfoTab(Long lessonNo) {
        return lessonRepository.getInfoTab(lessonNo);
    }

    public List<LessonRoundHomeworkStatusDto> getHomeworkTabInfo(Long lessonNo) {
        List<LessonRoundHomeworkStatusDto> lessonRoundHomeworkStatusDtoList = new ArrayList<>();
        // 수업의 강의 회차 정보
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);
        // 수업 수강 학생 목록
        List<StudentLessonList> studentLessonLists = studentLessonListRepository.findByLessonNo(lessonNo);
        for (LessonRound lessonRound : lessonRoundList) {
            LessonRoundHomeworkStatusDto lessonRoundHomeworkStatusDto = new LessonRoundHomeworkStatusDto();
            HomeworkNoticeDto homeworkNoticeDto = lessonHomeworkNoticeRepository.getHomeworkNoticeByLessonRoundNo(lessonRound.getLessonRoundNo());
            List<StudentHomeworkStatusDto> studentHomeworkStatusDtoList = new ArrayList<>();
            for (StudentLessonList studentLessonList : studentLessonLists) {
                StudentHomeworkStatusDto studentHomeworkStatusDto = lessonHomeworkRepository.getStudentHomeworkStatusByHomeworkNoticeNo(homeworkNoticeDto.getLessonHomeworkNoticeNo(), studentLessonList.getUserNo());
                studentHomeworkStatusDtoList.add(studentHomeworkStatusDto);
            }
            lessonRoundHomeworkStatusDto.setLessonRoundNo(lessonRound.getLessonRoundNo());
            lessonRoundHomeworkStatusDto.setLessonRoundNumber(lessonRound.getLessonRoundNumber());
            lessonRoundHomeworkStatusDto.setHomeworkNotice(homeworkNoticeDto);
            lessonRoundHomeworkStatusDto.setStudentHomeworkStatusList(studentHomeworkStatusDtoList);
            lessonRoundHomeworkStatusDtoList.add(lessonRoundHomeworkStatusDto);
        }
        return lessonRoundHomeworkStatusDtoList;
    }

    public TeacherProfileDto getTeacherProfile(Long userNo) {
        User user = userRepository.findByUserNo(userNo);
        TeacherProfileDto teacherProfile = new TeacherProfileDto();
        teacherProfile.setUserNo(user.getUserNo());
        teacherProfile.setUserName(user.getUserName());
        teacherProfile.setUserInfo(user.getUserInfo());
        teacherProfile.setProfileImg(user.getProfileImg());
        return teacherProfile;
    }
}
