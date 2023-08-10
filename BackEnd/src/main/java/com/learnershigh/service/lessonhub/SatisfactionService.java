package com.learnershigh.service.lessonhub;

import com.learnershigh.domain.lessonhub.Satisfaction;
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

    // 수업 총 만족도 뽑기
    public SatiResultDto lessonAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;



        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal/satiCnt;


        System.out.println(result);


        SatiResultDto satiResultDto = new SatiResultDto(result, satiCnt);

        return satiResultDto;

    }

    // 강사 총 만족도 뽑기
    public SatiResultDto teacherAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getLessonRoundCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        SatiResultDto satiResultDto = new SatiResultDto(result, satiCnt);

        return satiResultDto;

    }

    // 수업당 수업 만족도 뽑기
    public double oneLessonLectureSati(Long LessonNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByLessonNo(lessonRepository.findByLessonNo(LessonNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getLessonRoundCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }


    // 수업당 강사 만족도 뽑기
    public double oneLessonTeacherSati(Long LessonNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByLessonNo(lessonRepository.findByLessonNo(LessonNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }



}
