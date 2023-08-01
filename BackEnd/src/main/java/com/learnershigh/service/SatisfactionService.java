package com.learnershigh.service;

import com.learnershigh.domain.Satisfaction;
import com.learnershigh.dto.SatiDto;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.ClassRoundRepository;
import com.learnershigh.repository.SatisfactionRepository;
import com.learnershigh.repository.UserRepository;
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

    private final ClassRepository classRepository;

    private final ClassRoundRepository classRoundRepository;


    // 만족도 insert
    @Transactional
    public void satiCreate(SatiDto satiDto) {

        Satisfaction satisfaction = new Satisfaction();


        satisfaction.setStudentNo(userRepository.findByUserNo(satiDto.getStudentNo()));
        satisfaction.setTeacherNo(userRepository.findByUserNo(satiDto.getTeacherNo()));
        satisfaction.setClassRoundNo(classRoundRepository.findByClassRoundNo(satiDto.getClassRoundNo()));
        satisfaction.setClassNo(classRepository.findByClassNo(satiDto.getClassNo()));
        satisfaction.setClassRoundCsat(satiDto.getClassRoundCsat());
        satisfaction.setTeacherCsat(satiDto.getTeacherCsat());


        satisfactionRepository.save(satisfaction);
    }

    // 수업 총 만족도 뽑기
    public double classAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }

    // 강사 총 만족도 뽑기
    public double teacherAllSati(Long teacherNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByTeacherNo(userRepository.findByUserNo(teacherNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getClassRoundCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }

    // 수업당 수업 만족도 뽑기
    public double oneClassLectureSati(Long ClassNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByClassNo(classRepository.findByClassNo(ClassNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getClassRoundCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }


    // 수업당 강사 만족도 뽑기
    public double oneClassTeacherSati(Long ClassNo) {

        double satiTotal = 0.0;
        double satiCnt = 0.0;


        List<Satisfaction> satiList = satisfactionRepository.findAllByClassNo(classRepository.findByClassNo(ClassNo));

        for(Satisfaction satisfaction : satiList){
            satiCnt++;
            satiTotal += satisfaction.getTeacherCsat();
        }
        double result = satiTotal/satiCnt;

        System.out.println(result);

        return result;

    }



}
