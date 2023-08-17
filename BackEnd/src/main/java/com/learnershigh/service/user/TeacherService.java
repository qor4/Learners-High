package com.learnershigh.service.user;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonHomeworkNotice;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lessonhub.LessonHomework;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lesson.LessonMainListDto;
import com.learnershigh.dto.lessonhub.*;
import com.learnershigh.dto.user.TeacherProfileDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.LessonAttendRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkNoticeRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final LessonAttendRepository lessonAttendRepository;

    public boolean isTeacher(User user) {
        if (user == null) {
            return false;
        }
        if (!user.getUserType().equals("T")) {
            return false;
        }
        return true;
    }

    public boolean isTeacherLesson(User user, Long lessonNo) {
        Lesson lesson = lessonRepository.findByLessonNoAndUserNo(lessonNo, user);
        if (lesson == null) {
            return false;
        }
        return true;
    }


    public HashMap<Integer, Object> showWeeklyLessonSchedule(Long userNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
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
                lessonMainListDto.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
                lessonMainListDto.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
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
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (status.equals("전체")) { // 상태를 선택하지 않았을 경우
            lessonList = lessonRepository.findByUserNoOrderByLessonStartDateAsc(userNo);
        } else if (status.equals("강의 완료")) { // 상태가 강의 종료일 경우
            lessonList = lessonRepository.teacherLessonListEnd(userNo, status);
            // 별점 포함 목록 출력
        } else if (status.equals("강의 중") || status.equals("강의 전")) { // 상태가 강의 전, 강의 중일경우
            lessonList = lessonRepository.teacherLessonListStart(userNo, status);
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
            lessonListDto.setLessonStatus(lessonDomain.getLessonStatus());
            lessonListDtoList.add(lessonListDto);
        }
        return lessonListDtoList;
    }

    @Transactional
    public void joinHomeworkNotice(HomeworkNoticeJoinDto homeworkNoticeJoinDto) {
        User teacher = userRepository.findByUserNo(homeworkNoticeJoinDto.getUserNo());
        if (!isTeacher(teacher)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(teacher, homeworkNoticeJoinDto.getLessonNo())) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        Lesson lessonDomain = lessonRepository.findByLessonNoAndUserNo(homeworkNoticeJoinDto.getLessonNo(), teacher);
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(homeworkNoticeJoinDto.getLessonRoundNo());
        if (lessonDomain == null) {
            throw new IllegalStateException("수업 정보와 사용자 정보가 일치하지 않습니다.");
        }
        if (!lessonDomain.getLessonStatus().equals("강의 중")) {
            throw new IllegalStateException("진행 중인 강의만 과제 공지를 등록할 수 있습니다.");
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
            User student = userRepository.findByUserNo(studentLessonList.getUserNo().getUserNo());
            lessonHomework.setLessonNo(lessonDomain);
            lessonHomework.setLessonRoundNo(lessonRound);
            lessonHomework.setUserNo(student);
            lessonHomework.setLessonHomeworkNoticeNo(saveHomeworkNotice);
            lessonHomework.setHomeworkStatus("미제출");
            lessonHomeworkRepository.save(lessonHomework);
        }
    }

    public List<StudentAttendHomeworkDto> getStudentTabInfo(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(user, lessonNo)) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
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

    public String getInfoTab(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(user, lessonNo)) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        return lessonRepository.getInfoTab(lessonNo);
    }

    public List<LessonRoundHomeworkStatusDto> getHomeworkTabInfo(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(user, lessonNo)) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        List<LessonRoundHomeworkStatusDto> lessonRoundHomeworkStatusDtoList = new ArrayList<>();
        // 수업의 강의 회차 정보
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);
        // 수업 수강 학생 목록
        List<StudentLessonList> studentLessonLists = studentLessonListRepository.findByLessonNo(lessonNo);
        for (LessonRound lessonRound : lessonRoundList) {
            LessonRoundHomeworkStatusDto lessonRoundHomeworkStatusDto = new LessonRoundHomeworkStatusDto();
            List<StudentHomeworkStatusDto> studentHomeworkStatusDtoList = new ArrayList<>();
            HomeworkNoticeDto homeworkNoticeDto = lessonHomeworkNoticeRepository.getHomeworkNoticeByLessonRoundNo(lessonRound.getLessonRoundNo());
            if (homeworkNoticeDto != null) {
                for (StudentLessonList studentLessonList : studentLessonLists) {
                    StudentHomeworkStatusDto studentHomeworkStatusDto = lessonHomeworkRepository.getStudentHomeworkStatusByHomeworkNoticeNo(homeworkNoticeDto.getLessonHomeworkNoticeNo(), studentLessonList.getUserNo());
                    studentHomeworkStatusDtoList.add(studentHomeworkStatusDto);
                }
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
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        TeacherProfileDto teacherProfile = new TeacherProfileDto();
        teacherProfile.setUserNo(user.getUserNo());
        teacherProfile.setUserName(user.getUserName());
        teacherProfile.setUserInfo(user.getUserInfo());
        teacherProfile.setProfileImg(user.getProfileImg());
        return teacherProfile;
    }

    public Object getAttendRate(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(user, lessonNo)) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNoAndLessonRoundEndTimeBefore(lessonNo, LocalDateTime.now());
        List<LessonAttend> lessonAttendList = lessonAttendRepository.findByLessonRoundNoIn(lessonRoundList);

        if (lessonAttendList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }

        double attendCnt = 0.0;
        double absentCnt = 0.0;
        for (LessonAttend lessonAttend : lessonAttendList) {
            if (lessonAttend.getLessonAttendStatus().equals("출석")) {
                attendCnt++;
            } else {
                absentCnt++;
            }
        }
        double result = attendCnt / (absentCnt + attendCnt) * 100;
        return result;
    }

    public Object getHomeworkRate(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isTeacher(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isTeacherLesson(user, lessonNo)) {
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        LocalDateTime now = LocalDateTime.now();
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNoAndLessonRoundEndTimeBefore(lessonNo, now);
        if (lessonRoundList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNumberAndLessonRoundNumber(lessonNo, lessonRoundList.get(lessonRoundList.size() - 1).getLessonRoundNumber() + 1);
        if (lessonRound != null && lessonRound.getLessonRoundStartDatetime().isBefore(now)) {
            int deleteIndex = lessonRoundList.size() - 1;
            lessonRoundList.remove(deleteIndex);
        }
        List<LessonHomework> lessonHomeworkList = lessonHomeworkRepository.findByLessonRoundNoIn(lessonRoundList);
        double submissionCnt = 0.0;
        double unsubmittedCnt = 0.0;
        if (lessonHomeworkList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }

        for (LessonHomework lessonHomework : lessonHomeworkList) {
            if (lessonHomework.getHomeworkStatus().equals("제출")) {
                submissionCnt++;
            } else {
                unsubmittedCnt++;
            }
        }
        double result = submissionCnt / (submissionCnt + unsubmittedCnt) * 100;
        return result;
    }
}
