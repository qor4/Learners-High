package com.learnershigh.service.etc;

import com.learnershigh.domain.LessonRoundAttentionRate;
import com.learnershigh.dto.etc.AttentionDto;
import com.learnershigh.dto.etc.AttentionRateMetadataDto;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.repository.LessonRoundAttentionRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AttentionService {

    private final LessonRoundAttentionRateRepository lessonRoundAttentionRateRepository;


    @Transactional
    public void saveAttentionRate(SaveAttentionRateDto saveAttentionRateDto) {
        LessonRoundAttentionRate lessonRoundAttentionRate = new LessonRoundAttentionRate();
        AttentionRateMetadataDto attentionRateMetadataDto = new AttentionRateMetadataDto();

        attentionRateMetadataDto.setLessonNo(saveAttentionRateDto.getLessonNo());
        attentionRateMetadataDto.setLessonRoundNo(saveAttentionRateDto.getLessonRoundNo());
        attentionRateMetadataDto.setUserNo(saveAttentionRateDto.getUserNo());
        lessonRoundAttentionRate.setMetadata(attentionRateMetadataDto);
        lessonRoundAttentionRate.setTimestamp(LocalDateTime.now());
        lessonRoundAttentionRate.setRate(saveAttentionRateDto.getRate());
        lessonRoundAttentionRateRepository.save(lessonRoundAttentionRate);
    }

    public List<Object> test() {
        return lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now());
    }


//    학생
//-> 하나 수업의 모든 회차 자기 집중도 20구간
//-> 회차당 자기 집중도 20구간
//-> 그 수업을 듣는 모든 학생의 집중도 평균 20구간

    // 학생 하나 수업의 모든 회차 자기 집중도 20구간
//    public double studentAllroundAttention() {
//        List<Object> list = new ArrayList<>();
//        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now());
//
//
//        return lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now());
//    }

    // 학생 한수업의 한회차당 자기 집중도 20구간
    public double studentOneroundAttentionAvg() {
        List<AttentionDto> list = new ArrayList<>();
        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(1L, LocalDateTime.now(), LocalDateTime.now()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        System.out.println(list.toString());
        System.out.println(list.size());
        double sum = 0.0;

        for (AttentionDto lrar : list) {
            System.out.println(lrar.getAvg_value());
            sum += lrar.getAvg_value();
        }

        System.out.println(sum);
        return sum/20.0;

    }

    // 그 수업을 듣는 모든 학생의 집중도 평균 20구간


}
