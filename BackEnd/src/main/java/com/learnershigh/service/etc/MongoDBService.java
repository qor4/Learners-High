package com.learnershigh.service.etc;

import com.learnershigh.domain.LessonRoundAttentionRate;
import com.learnershigh.dto.etc.AttentionRateMetadataDto;
import com.learnershigh.dto.etc.SaveAttentionRateDto;
import com.learnershigh.repository.LessonRoundAttentionRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MongoDBService {

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
}
