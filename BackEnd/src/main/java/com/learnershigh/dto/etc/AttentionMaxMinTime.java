package com.learnershigh.dto.etc;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AttentionMaxMinTime {

    // 최대값
    private double max;

    // 최소값
    private double min;

    // 최대값의 시작하는 시간
    private Date maxStartTime;

    // 최대값의 끝나는 시간
    private Date maxEndTime;

    // 최소값의 시작하는 시간
    private Date minStartTime;

    // 최소값의 끝나는 시간
    private Date minEndTime;
}
