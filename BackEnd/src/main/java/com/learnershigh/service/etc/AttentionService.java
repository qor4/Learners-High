package com.learnershigh.service.etc;

import com.learnershigh.domain.LessonRoundAttentionRate;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.dto.etc.AttentionDto;
import com.learnershigh.dto.etc.AttentionMaxMinTime;
import com.learnershigh.dto.etc.AttentionRateMetadataDto;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.repository.LessonRoundAttentionRateRepository;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AttentionService {

    private final LessonRoundAttentionRateRepository lessonRoundAttentionRateRepository;

    private final LessonRoundRepository lessonRoundRepository;


    @Transactional
    public void saveAttentionRate(SaveAttentionRateDto saveAttentionRateDto) {
        LessonRoundAttentionRate lessonRoundAttentionRate = new LessonRoundAttentionRate();
        AttentionRateMetadataDto attentionRateMetadataDto = new AttentionRateMetadataDto();
        attentionRateMetadataDto.setLessonNo(saveAttentionRateDto.getLessonNo());
        attentionRateMetadataDto.setLessonRoundNo(saveAttentionRateDto.getLessonRoundNo());
        attentionRateMetadataDto.setUserNo(saveAttentionRateDto.getUserNo());
        attentionRateMetadataDto.setStatus(saveAttentionRateDto.getStatus());
        lessonRoundAttentionRate.setMetadata(attentionRateMetadataDto);
        lessonRoundAttentionRate.setTimestamp(LocalDateTime.now());
        lessonRoundAttentionRate.setRate(saveAttentionRateDto.getRate());
        lessonRoundAttentionRateRepository.save(lessonRoundAttentionRate);
    }

    public List<AttentionDto> test() {
        return lessonRoundAttentionRateRepository.test();
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
    public double onestudentOneroundAttentionAvg() {
        List<AttentionDto> list = new ArrayList<>();
        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        System.out.println(list.toString());
        System.out.println(list.size());
        double sum = 0.0;

        for (AttentionDto ad : list) {
            System.out.println(ad.getAvgValue());
            sum += ad.getAvgValue();
        }

        System.out.println(sum);
        return sum / 20.0;

    }

    // 한학생당 한수업의 한회차당 자기 집중도 (20구간)의 최대값,최소값 + 시간
    public AttentionMaxMinTime onestudentOneroundAttentionAvgandMaxMin(Long userNo, Long lessonRoundNo) {

        List<AttentionDto> list = new ArrayList<>();
        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        System.out.println(list.toString());
        System.out.println(list.size());

        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        Date maxStartTime = new Date();
        Date maxEndTime = new Date();
        Date minStartTime = new Date();
        Date minEndTime = new Date();

        AttentionMaxMinTime attentionMaxMinTime = new AttentionMaxMinTime();

        for (AttentionDto ad : list) {
            System.out.println(ad.getAvgValue());

            if (ad.getAvgValue() > max) {
                max = ad.getAvgValue();
                maxStartTime = ad.getId().getMax();
                maxEndTime = ad.getId().getMin();
            }
            if (ad.getAvgValue() < min) {
                min = ad.getAvgValue();
                minStartTime = ad.getId().getMax();
                maxEndTime = ad.getId().getMin();
            }


            attentionMaxMinTime.setMax(max);
            attentionMaxMinTime.setMin(min);
            attentionMaxMinTime.setMaxStartTime(maxStartTime);
            attentionMaxMinTime.setMaxEndTime(maxEndTime);
            attentionMaxMinTime.setMinStartTime(minStartTime);
            attentionMaxMinTime.setMinEndTime(minEndTime);


        }


        return attentionMaxMinTime;
    }

    // 그 수업을 듣는 모든 학생의 집중도 평균 20구간
    public double allstudentOneroundAttentionAvg() {
        List<AttentionDto> list = new ArrayList<>();
        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(1L, LocalDateTime.now(), LocalDateTime.now()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        System.out.println(list.toString());
        System.out.println(list.size());
        double sum = 0.0;

        for (AttentionDto lrar : list) {
            System.out.println(lrar.getAvgValue());
            sum += lrar.getAvgValue();
        }

        System.out.println(sum);
        return sum / 20.0;

    }

    // 한수업의 한회차당 모든 학생의 집중도(20구간)의 최대값,최소값 + 시간
    public AttentionMaxMinTime allstudentOneroundAttentionAvgandMaxMin(Long lessonRoundNo) {

        List<AttentionDto> list = new ArrayList<>();
        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(1L, LocalDateTime.now(), LocalDateTime.now()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        System.out.println(list.toString());
        System.out.println(list.size());

        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        Date maxStartTime = new Date();
        Date maxEndTime = new Date();
        Date minStartTime = new Date();
        Date minEndTime = new Date();

        AttentionMaxMinTime attentionMaxMinTime = new AttentionMaxMinTime();

        for (AttentionDto ad : list) {
            System.out.println(ad.getAvgValue());

            if (ad.getAvgValue() > max) {
                max = ad.getAvgValue();
                maxStartTime = ad.getId().getMax();
                maxEndTime = ad.getId().getMin();
            }
            if (ad.getAvgValue() < min) {
                min = ad.getAvgValue();
                minStartTime = ad.getId().getMax();
                maxEndTime = ad.getId().getMin();
            }


            attentionMaxMinTime.setMax(max);
            attentionMaxMinTime.setMin(min);
            attentionMaxMinTime.setMaxStartTime(maxStartTime);
            attentionMaxMinTime.setMaxEndTime(maxEndTime);
            attentionMaxMinTime.setMinStartTime(minStartTime);
            attentionMaxMinTime.setMinEndTime(minEndTime);


        }


        return attentionMaxMinTime;
    }

    // 하나의 수업의 모든 회차 집중도(모든 학생) 20구간
    public double[] oneClassAllroundAllstudent(Long lessonNo) {

        double arr[] = new double[21];

        List<LessonRound> timelist = lessonRoundRepository.findByLessonNo(lessonNo);

        for (LessonRound lr : timelist) {

            int count = 1;

            List<AttentionDto> lrlist = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(lr.getLessonRoundNo(), lr.getLessonRoundStartDatetime(), lr.getLessonRoundEndDatetime());

            for (AttentionDto ad : lrlist) {
                arr[count] += ad.getAvgValue();
                count++;
            }

            // 나누기?

        }

        return arr;


    }

//    // 하나의 수업의 모든 회차 집중도(한명 학생) 20구간
//    public double[] oneClassAllroundOnestudent(Long lessonNo, Long userNo) {
//
//        double arr[] = new double[21];
//
//        List<LessonRound> timelist = lessonRoundRepository(lessonNo);
//
//        for (LessonRound lr : timelist) {
//
//            int count = 1;
//
//            List<AttentionDto> lrlist = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(lessonRoundNo, lr.getLessonRoundStartDatetime(), lr.getLessonRoundEndDatetime());
//
//            for (AttentionDto ad : lrlist) {
//                arr[count] += ad.getAvg_value();
//                count++;
//            }
//
//
//        }
//
//        return arr;
//
//
//    }


}
