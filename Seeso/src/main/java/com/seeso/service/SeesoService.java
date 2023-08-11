package com.seeso.service;

import com.seeso.domain.LessonRoundAttentionRate;
import com.seeso.dto.AttentionRateMetadataDto;
import com.seeso.dto.SaveAttentionRateDto;
import com.seeso.repository.LessonRoundAttentionRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SeesoService {

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
}
