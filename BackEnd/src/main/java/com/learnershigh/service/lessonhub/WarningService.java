package com.learnershigh.service.lessonhub;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.lessonhub.Warning;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lessonhub.SatiDto;
import com.learnershigh.dto.lessonhub.SatiResultDto;
import com.learnershigh.dto.lessonhub.SaveWarningDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.SatisfactionRepository;
import com.learnershigh.repository.lessonhub.WarningRepository;
import com.learnershigh.repository.user.UserRepository;
import com.learnershigh.service.user.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WarningService {

    private final UserRepository userRepository;
    private final WarningRepository warningRepository;
    private final LessonRepository lessonRepository;
    private final LessonRoundRepository lessonRoundRepository;
    private final StudentService studentService;
    // 주의 정보 insert
    @Transactional
    public void saveWarning(SaveWarningDto saveWarningDto) {
        User user = userRepository.findByUserNo(saveWarningDto.getStudentNo());
        if (!studentService.isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!studentService.isStudentLesson(user, saveWarningDto.getLessonNo())) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
        Warning warning = new Warning();
        warning.setLessonNo(lessonRepository.findByLessonNo(saveWarningDto.getLessonNo()));
        warning.setLessonRoundNo(lessonRoundRepository.findByLessonRoundNo(saveWarningDto.getLessonRoundNo()));
        warning.setUserNo(user);
        warningRepository.save(warning);
    }

    // 한수업의 회차별 한 학생에 대한 주의갯수 배열
    public HashMap<Integer, Integer> oneStudentOneLesson(Long userNo, Long lessonNo){

        Lesson lesson = lessonRepository.findByLessonNo(lessonNo);

        int num = lesson.getLessonTotalRound();
        HashMap<Integer, Integer> result = new HashMap<>();

//        int arr[] = new int[num+1];

        for (int i=1;i<num+1;i++){
            LessonRound lessonRound = lessonRoundRepository.findByLessonNoAndLessonRoundNumber(lessonNo,i);
            List<Warning> warnings = warningRepository.findAllByLessonRoundNoAndUserNo(lessonRound.getLessonRoundNo(), userNo);
            result.put(i, warnings.size());
        }

        return result;
    }

    // 한 수업의 회차별 모든 학생에 대한 주의갯수 배열
    public HashMap<Integer, Integer> allStudentOneLesson(Long lessonNo){

        Lesson lesson = lessonRepository.findByLessonNo(lessonNo);

        int num = lesson.getLessonTotalRound();
        HashMap<Integer, Integer> result = new HashMap<>();

        for (int i=1;i<num+1;i++){
            LessonRound lessonRound = lessonRoundRepository.findByLessonNoAndLessonRoundNumber(lessonNo,i);
            List<Warning> warnings = warningRepository.findAllByLessonRoundNo(lessonRound.getLessonRoundNo());
            result.put(i, warnings.size());
        }

        return result;
    }
}
