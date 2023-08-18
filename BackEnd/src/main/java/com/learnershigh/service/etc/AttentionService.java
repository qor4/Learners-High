package com.learnershigh.service.etc;

import com.learnershigh.domain.LessonRoundAttentionRate;
import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.dto.etc.AttentionDto;
import com.learnershigh.dto.etc.AttentionMaxMinTime;
import com.learnershigh.dto.etc.AttentionRateMetadataDto;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.dto.lesson.LessonInfoDto;
import com.learnershigh.repository.LessonRoundAttentionRateRepository;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
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

    private final StudentLessonListRepository studentLessonListRepository;

    private final LessonRepository lessonRepository;

    private final UserRepository userRepository;

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



//    학생
//-> 하나 수업의 모든 회차 자기 집중도 20구간
//-> 회차당 자기 집중도 20구간
//-> 그 수업을 듣는 모든 학생의 집중도 평균 20구간

//    // 학생 하나 수업의 모든 회차 자기 집중도 20구간
//    public double studentAllroundAttention() {
//        List<Object> list = new ArrayList<>();
//        list = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now());
//
//
//        return lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(1L, 1L, LocalDateTime.now(), LocalDateTime.now());
//    }

    // 학생 한수업의 한 회차당 자기 집중도 20구간 평균
    public double oneStudentOneRoundAttentionAvg(Long userNo, Long lessonRoundNo) { // 들어갈변수값 넣어야 함.
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(userNo, lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        double sum = 0.0;

        for (AttentionDto attention : attentionList) {
            sum += attention.getAvgValue();
        }

        return sum / 20.0;

    }

    // 한학생당 한수업의 한회차당 자기 집중도 (20구간)의 최대값,최소값 + 시간
    public AttentionMaxMinTime oneStudentOneRoundAttentionAvgAndMaxMin(Long userNo, Long lessonRoundNo) {
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(userNo, lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)


        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        Date maxStartTime = new Date();
        Date maxEndTime = new Date();
        Date minStartTime = new Date();
        Date minEndTime = new Date();

        AttentionMaxMinTime attentionMaxMinTime = new AttentionMaxMinTime();

        for (AttentionDto attention : attentionList) {

            if (attention.getAvgValue() > max) {
                max = attention.getAvgValue();
                maxStartTime = attention.getId().getMax();
                maxEndTime = attention.getId().getMin();
            }
            if (attention.getAvgValue() < min) {
                min = attention.getAvgValue();
                minStartTime = attention.getId().getMax();
                maxEndTime = attention.getId().getMin();
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

    // 한 수업의 한 회차당 모든 학생의 20구간 집중도 평균
    public double allStudentOneRoundAttentionAvg(Long lessonRoundNo) {
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        double sum = 0.0;

        for (AttentionDto attention : attentionList) {
            sum += attention.getAvgValue();
        }

        return sum / 20.0;
    }

    // 한수업의 한회차당 모든 학생의 집중도(20구간)의 최대값,최소값 + 시간
    public AttentionMaxMinTime allStudentOneRoundAttentionAvgAndMaxMin(Long lessonRoundNo) {
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);
        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)


        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        Date maxStartTime = new Date();
        Date maxEndTime = new Date();
        Date minStartTime = new Date();
        Date minEndTime = new Date();

        AttentionMaxMinTime attentionMaxMinTime = new AttentionMaxMinTime();

        for (AttentionDto attention : attentionList) {

            if (attention.getAvgValue() > max) {
                max = attention.getAvgValue();
                maxStartTime = attention.getId().getMax();
                maxEndTime = attention.getId().getMin();
            }
            if (attention.getAvgValue() < min) {
                min = attention.getAvgValue();
                minStartTime = attention.getId().getMax();
                maxEndTime = attention.getId().getMin();
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

    // 하나의 수업의 모든 회차 집중도(모든 학생) 회차당
    public List<Double> allStudentOneLessonAttentionList(Long lessonNo) {

        List<Double> attentionAvgList = new ArrayList<>();

        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);

        for (LessonRound lessonRound : lessonRoundList) {
            AttentionDto attention = lessonRoundAttentionRateRepository.aggregateTotalAttentionByLessonRoundNo(lessonRound.getLessonRoundNo(), lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime());
            if(attention == null){
                attentionAvgList.add(0.0);
            }
            else{
                attentionAvgList.add(attention.getAvgValue());
            }
        }

        return attentionAvgList;

    }

    // 하나의 수업의 모든 회차 집중도(한명 학생) 회차당
    public List<Double> oneStudentOneLessonAttentionList(Long userNo, Long lessonNo) {

        List<Double> attentionAvgList = new ArrayList<>();

        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);


        for (LessonRound lessonRound : lessonRoundList) {
            AttentionDto attention = lessonRoundAttentionRateRepository.aggregateTotalAttentionByLessonRoundNoAndUserNo(userNo, lessonRound.getLessonRoundNo(), lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime());
            if(attention == null){
                attentionAvgList.add(0.0);
            }
            else{
                attentionAvgList.add(attention.getAvgValue());
            }
        }

        return attentionAvgList;
    }


    // 학생 한수업의 자기 집중도 회차당 평균
    public double oneStudentOneLessonAttentionAvg(Long userNo, Long lessonNo) { // 들어갈변수값 넣어야 함.
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);

        double sum = 0.0;

        for (LessonRound lessonRound : lessonRoundList) {
            AttentionDto attention = lessonRoundAttentionRateRepository.aggregateTotalAttentionByLessonRoundNoAndUserNo(userNo, lessonRound.getLessonRoundNo(), lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime());
            if(attention == null){
                return 0;
            }
            sum += attention.getAvgValue();
        }

        return sum / lessonRoundList.size();
    }

    // 한 수업의 모든학생 집중도 회차당 평균
    public double allStudentOneLessonAttentionAvg(Long lessonNo) { // 들어갈변수값 넣어야 함.
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);

        double sum = 0.0;

        for (LessonRound lessonRound : lessonRoundList) {
            AttentionDto attention = lessonRoundAttentionRateRepository.aggregateTotalAttentionByLessonRoundNo(lessonRound.getLessonRoundNo(), lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime());
            if(attention == null){
                return 0;
            }
            sum += attention.getAvgValue();
        }

        return sum / lessonRoundList.size();
    }
    // 한수업의 한 학생의 집중도(회차탕)의 최대값,최소값 + 회차
    public HashMap<String, HashMap> oneStudentOneLessonAttentionAvgAndMaxMin(Long userNo, Long lessonNo) {
        List<Double> attentionList = oneStudentOneLessonAttentionList(userNo, lessonNo);

        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        int maxRound = -1;
        int minRound = -1;

        for (int i = 0; i < attentionList.size(); i++) {
            double attention = attentionList.get(i);
            if (attention > max) {
                max = attention;
                maxRound = i + 1;
            }
            if (attention < min) {
                min = attention;
                minRound = i + 1;
            }
        }
        HashMap<String, HashMap> result = new HashMap<>();

        HashMap<String, Object> minInfo = new HashMap<>();
        minInfo.put("round", minRound);
        minInfo.put("value", min);
        HashMap<String, Object> maxInfo = new HashMap<>();
        maxInfo.put("round", maxRound);
        maxInfo.put("value", max);

        result.put("max", maxInfo);
        result.put("min", minInfo);

        return result;
    }

    // 한수업의 모든 학생의 집중도(회차탕)의 최대값,최소값 + 회차
    public HashMap<String, HashMap> allStudentOneLessonAttentionAvgAndMaxMin(Long lessonNo) {
        List<Double> attentionList = allStudentOneLessonAttentionList(lessonNo);

        double min = Double.MAX_VALUE;
        double max = Double.MIN_VALUE;
        int maxRound = -1;
        int minRound = -1;

        for (int i = 0; i < attentionList.size(); i++) {
            double attention = attentionList.get(i);
            if (attention > max) {
                max = attention;
                maxRound = i + 1;
            }
            if (attention < min) {
                min = attention;
                minRound = i + 1;
            }
        }
        HashMap<String, HashMap> result = new HashMap<>();

        HashMap<String, Object> minInfo = new HashMap<>();
        minInfo.put("round", minRound);
        minInfo.put("value", min);
        HashMap<String, Object> maxInfo = new HashMap<>();
        maxInfo.put("round", maxRound);
        maxInfo.put("value", max);

        result.put("max", maxInfo);
        result.put("min", minInfo);

        return result;
    }

    // 한 회차당 한 학생 집중도 20구간
    public List<AttentionDto> oneStudentOneRoundAttentionList(Long userNo, Long lessonRoundNo) {
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);

        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNoAndUserNo(userNo, lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        return attentionList;
    }

    // 한 회차당 모든 학생 집중도 20구간
    public List<AttentionDto> allStudentOneRoundAttentionList(Long lessonRoundNo) {
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNo(lessonRoundNo);

        List<AttentionDto> attentionList = lessonRoundAttentionRateRepository.aggregateAttentionByLessonRoundNo(lessonRoundNo, lessonRound.getLessonRoundStartDatetime(), lessonRound.getLessonRoundEndDatetime()); // time 바꿔야 됨. (mysql 에 있는 걸로)

        return attentionList;
    }



    // 한 학생이 들은 모든 강의중 가장 집중도가 높은 수업이름 출력
    public String oneStudentMaxlessonAvg(Long userNo) {


        double max = 0.0;

        String rs = "";

        List<StudentLessonList> list = studentLessonListRepository.findAllByUserNo(userRepository.findByUserNo(userNo));
        for (StudentLessonList sll : list) {

            List<LessonRound> lrlist = lessonRoundRepository.findAllByLessonNo(sll.getLessonNo());

            double sum = 0.0;

            for (LessonRound lr : lrlist) {
                sum += oneStudentOneRoundAttentionAvg(userNo, lr.getLessonRoundNo()); // 들어갈 변수값들 넣어야함.
            }
            if (sum > max) {
                max = sum;
                rs = sll.getLessonNo().getLessonName();
            }
        }

        return rs;

    }


}
