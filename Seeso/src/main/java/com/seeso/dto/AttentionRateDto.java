package com.seeso.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AttentionRateDto {
    private Float rate;
    private LocalDateTime timeStamp;
}
