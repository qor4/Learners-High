package com.seeso.domain;

import com.seeso.dto.AttentionRateMetadataDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.TimeSeries;

import java.time.LocalDateTime;
import java.util.Date;


@Getter
@Setter
@TimeSeries(collection="lesson-round-attention-rate", timeField = "timestamp")
public class LessonRoundAttentionRate {

    @Id
    private String id;
    private AttentionRateMetadataDto metadata;
    private LocalDateTime timestamp;
    private Float rate;
}