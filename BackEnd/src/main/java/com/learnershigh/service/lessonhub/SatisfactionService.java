package com.learnershigh.service.lessonhub;

import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.Satisfaction;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lessonhub.SatiDto;
import com.learnershigh.dto.lessonhub.SatiResultDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.SatisfactionRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SatisfactionService {

    private final SatisfactionRepository satisfactionRepository;

    private final UserRepository userRepository;

    private final LessonRepository lessonRepository;

    private final LessonRoundRepository lessonRoundRepository;


    // 만족도 insert
    @Transactional
    public void satiCreate(SatiDto satiDto) {

        Satisfaction satisfaction = new Satisfaction();


        satisfaction.setStudentNo(userRepository.findByUserNo(satiDto.getStudentNo()));
        satisfaction.setTeacherNo(userRepository.findByUserNo(satiDto.getTeacherNo()));
        satisfaction.setLessonRoundNo(lessonRoundRepository.findByLessonRoundNo(satiDto.getLessonRoundNo()));
        satisfaction.setLessonNo(lessonRepository.findByLessonNo(satiDto.getLessonNo()));
        satisfaction.setLessonRoundCsat(satiDto.getLessonRoundCsat());
        satisfaction.setTeacherCsat(satiDto.getTeacherCsat());


        satisfactionRepository.save(satisfaction);
    }

    // 만족도 제출전 중복 검사
    public void beforeCreateCheck(Long lessonRoundNo,Long teacherNo ,Long studentNo){
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        User teacher = userRepository.findByUserNo(teacherNo);
        User student = userRepository.findByUserNo(studentNo);

        Satisfaction satisfaction = satisfactionRepository.findByLessonRoundNoAndTeacherNoAndStudentNo(lessonRound, teacher, student);

        System.out.println("서비스 들?");
        if (satisfaction != null){
            System.out.println("들어왔니?");
            System.out.println(satisfaction);
            throw new IllegalStateException("이미 제출된 만족도가 있습니다.");
        }
    }


    // 수업 총 만족도 뽑기
    public SatiResultDto lessonAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double totalCnt = 0.0;

        int one = 0;
        int two = 0;
        int three = 0;
        int four = 0;
        int five = 0;

        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        if (satiList.size() == 0) {
            throw new IllegalStateException("저장된 만족도가 없습니다.");
        }

        for (Satisfaction satisfaction : satiList) {


            if (satisfaction.getLessonRoundCsat() == 1) {
                one++;
            } else if (satisfaction.getLessonRoundCsat() == 2) {
                two++;
            } else if (satisfaction.getLessonRoundCsat() == 3) {
                three++;
            } else if (satisfaction.getLessonRoundCsat() == 4) {
                four++;
            } else if (satisfaction.getLessonRoundCsat() == 5) {
                five++;
            }
            totalCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal / totalCnt;


        System.out.println(result);


        SatiResultDto satiResultDto = new SatiResultDto(one, two, three, four, five, totalCnt, result);

        return satiResultDto;

    }

    // 강사 총 만족도 뽑기
    public SatiResultDto teacherAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double totalCnt = 0.0;

        int one = 0;
        int two = 0;
        int three = 0;
        int four = 0;
        int five = 0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        if (satiList.size() == 0) {
            throw new IllegalStateException("저장된 만족도가 없습니다.");
        }

        for (Satisfaction satisfaction : satiList) {

            if (satisfaction.getTeacherCsat() == 1) {
                one++;
            } else if (satisfaction.getTeacherCsat() == 2) {
                two++;
            } else if (satisfaction.getTeacherCsat() == 3) {
                three++;
            } else if (satisfaction.getTeacherCsat() == 4) {
                four++;
            } else if (satisfaction.getTeacherCsat() == 5) {
                five++;
            }
            totalCnt++;
            satiTotal += satisfaction.getLessonRoundCsat();
        }
        double result = satiTotal / totalCnt;

        System.out.println(result);

        SatiResultDto satiResultDto = new SatiResultDto(one, two, three, four, five, totalCnt, result);

        return satiResultDto;

    }

    // 수업당 수업 만족도 뽑기
    public SatiResultDto oneLessonLectureSati(Long LessonNo) {

        double satiTotal = 0.0;
        double totalCnt = 0.0;

        int one = 0;
        int two = 0;
        int three = 0;
        int four = 0;
        int five = 0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByLessonNo(lessonRepository.findByLessonNo(LessonNo));

        if (satiList.size() == 0) {
            throw new IllegalStateException("저장된 만족도가 없습니다.");
        }

        for (Satisfaction satisfaction : satiList) {

            if (satisfaction.getLessonRoundCsat() == 1) {
                one++;
            } else if (satisfaction.getLessonRoundCsat() == 2) {
                two++;
            } else if (satisfaction.getLessonRoundCsat() == 3) {
                three++;
            } else if (satisfaction.getLessonRoundCsat() == 4) {
                four++;
            } else if (satisfaction.getLessonRoundCsat() == 5) {
                five++;
            }

            totalCnt++;
            satiTotal += satisfaction.getLessonRoundCsat();
        }
        double result = satiTotal / totalCnt;

        System.out.println(result);

        SatiResultDto satiResultDto = new SatiResultDto(one, two, three, four, five, totalCnt, result);

        return satiResultDto;

    }


    // 수업당 강사 만족도 뽑기
    public SatiResultDto oneLessonTeacherSati(Long LessonNo) {

        double satiTotal = 0.0;
        double totalCnt = 0.0;

        int one = 0;
        int two = 0;
        int three = 0;
        int four = 0;
        int five = 0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByLessonNo(lessonRepository.findByLessonNo(LessonNo));

        if (satiList.size() == 0) {
            throw new IllegalStateException("저장된 만족도가 없습니다.");
        }

        for (Satisfaction satisfaction : satiList) {

            if (satisfaction.getLessonRoundCsat() == 1) {
                one++;
            } else if (satisfaction.getLessonRoundCsat() == 2) {
                two++;
            } else if (satisfaction.getLessonRoundCsat() == 3) {
                three++;
            } else if (satisfaction.getLessonRoundCsat() == 4) {
                four++;
            } else if (satisfaction.getLessonRoundCsat() == 5) {
                five++;
            }

            totalCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal / totalCnt;

        System.out.println(result);

        SatiResultDto satiResultDto = new SatiResultDto(one, two, three, four, five, totalCnt, result);


        return satiResultDto;

    }


}
