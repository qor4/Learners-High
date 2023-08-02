package com.learnershigh.service.lesson;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.user.User;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.LessonAttendRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LessonroomService {
    private final LessonRoundRepository lessonRoundRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final StudentLessonListRepository studentLessonListRepository;
    private final LessonAttendRepository lessonAttendRepository;

    @Transactional
    public void createLessonroom(Long lessonNo, Long lessonRoundNo) {
        // sessionId lessonRoundNo에 업데이트
        // 수업 생성되면 해당 수업을 듣는 학생들 전체 출결 테이블에 생성
        Lesson lessonDomain = lessonRepository.findByLessonNo(lessonNo);
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        List<StudentLessonList> studentLessonLists = studentLessonListRepository.findByLessonNo(lessonNo);
        for (StudentLessonList studentLessonList : studentLessonLists) {
            User user = userRepository.findByUserNo(studentLessonList.getUserNo().getUserNo());
            LessonAttend lessonAttend = new LessonAttend();
            lessonAttend.setLessonNo(lessonDomain);
            lessonAttend.setLessonRoundNo(lessonRound);
            lessonAttend.setUserNo(user);
            lessonAttend.setLessonAttendStatus("결석");
            lessonAttendRepository.save(lessonAttend);
        }
    }
    @Transactional
    public void enterLessonroom(Long lessonNo, Long lessonRoundNo, Long userNo) {
        User user = userRepository.findByUserNo(userNo);
        Lesson lessonDomain = lessonRepository.findByLessonNo(lessonNo);
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        StudentLessonList studentLessonList = studentLessonListRepository.findByLessonNoAndUserNo(lessonDomain, user);
        if (studentLessonList == null) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }

        // 토큰 값 리턴

        // 출석을 했었는지
        LessonAttend lessonAttend = lessonAttendRepository.findByLessonRoundNoAndUserNo(lessonRound, user);
        if (lessonAttend.getLessonAttendDatetime() == null) { // 처음 출석
            LocalDateTime lessonStartTime = lessonRound.getLessonRoundStartDatetime();
            LocalDateTime lessonEndTime = lessonRound.getLessonRoundEndDatetime();
            LocalDateTime now = LocalDateTime.now();
            lessonAttend.setLessonAttendDatetime(now);
            if (now.isBefore(lessonStartTime)) { // 시작 시간보다 이전인 경우
                lessonAttend.setLessonAttendStatus("출석");
            } else if (now.isAfter(lessonStartTime) && now.isBefore(lessonEndTime)) { // 시작 시간 이후, 종료 시간 이전인 경우
                lessonAttend.setLessonAttendStatus("지각");
            } else {
                lessonAttend.setLessonAttendStatus("결석");
            }
            lessonAttendRepository.save(lessonAttend);
        }

    }
}
