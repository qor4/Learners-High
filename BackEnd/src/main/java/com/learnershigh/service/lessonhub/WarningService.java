package com.learnershigh.service.lessonhub;

import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.lessonhub.Warning;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lessonhub.SatiDto;
import com.learnershigh.dto.lessonhub.SatiResultDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.SatisfactionRepository;
import com.learnershigh.repository.lessonhub.WarningRepository;
import com.learnershigh.repository.user.UserRepository;
import com.learnershigh.service.user.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void saveWarning(Long lessonNo, Long lessonRoundNo, Long userNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!studentService.isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!studentService.isStudentLesson(user, lessonNo)) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
        Warning warning = new Warning();
        warning.setLessonNo(lessonRepository.findByLessonNo(lessonNo));
        warning.setLessonRoundNo(lessonRoundRepository.findByLessonRoundNo(lessonRoundNo));
        warning.setUserNo(user);
        warningRepository.save(warning);
    }
}
