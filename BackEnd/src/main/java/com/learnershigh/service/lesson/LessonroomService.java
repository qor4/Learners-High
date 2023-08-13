package com.learnershigh.service.lesson;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lesson.LessonUserInfoDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.LessonAttendRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
import com.learnershigh.service.etc.OpenviduService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LessonroomService {
    private final LessonRoundRepository lessonRoundRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final StudentLessonListRepository studentLessonListRepository;
    private final LessonAttendRepository lessonAttendRepository;

    public static final Logger logger = LoggerFactory.getLogger(LessonroomService.class);
    
    public void checkStudent(Long userNo, Long lessonNo){
        logger.info("*** checkStudent 메소드 호출");
        Lesson lesson = new Lesson();
        lesson.setLessonNo(lessonNo);
        User user = new User();
        user.setUserNo(userNo);
        StudentLessonList studentLessonList = studentLessonListRepository.findByLessonNoAndUserNo(lesson,user);
        if(studentLessonList == null){
            logger.info("*** 수강 신청 목록에 존재하지 않음.");
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
    }
    
    public void checkTeacher(Long userNo, Long lessonNo){
        logger.info("*** checkTeacher 메소드 호출");
        User user = new User();
        user.setUserNo(userNo);
        Lesson lesson = lessonRepository.findByLessonNoAndUserNo(lessonNo,user);

        if(lesson == null){
            logger.info("*** 강의 목록에 존재하지 않음.");
            throw new IllegalStateException("강의하지 않는 수업입니다.");
        }
        logger.info("*** checkTeacher 메소드 종료");
    }
    @Transactional
    public void Attend(Long lessonRoundNo, Long userNo) {
        logger.info("*** Attend 메소드 호출");
        User user = userRepository.findByUserNo(userNo);
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);

        logger.info("*** 출석 데이터 변경 시작");
        LessonAttend lessonAttend = lessonAttendRepository.findByLessonRoundNoAndUserNo(lessonRound, user);
        if(lessonAttend == null) {
            logger.info("*** lessonAttend 가 없음");
            return;
        }
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
            logger.info("*** 출석 데이터 변경 완료");
        }
        logger.info("*** Attend 메소드 종료");
    }

}
