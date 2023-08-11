package com.learnershigh.domain;

import com.learnershigh.dto.etc.AttentionRateMetadataDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.TimeSeries;

import java.time.LocalDateTime;


@Getter
@Setter
@TimeSeries(collection = "lesson_round_attention_rate", timeField = "timestamp")
public class LessonRoundAttentionRate {

    @Id
    private String id;
    private AttentionRateMetadataDto metadata;
    private LocalDateTime timestamp;
    private Float rate;
}