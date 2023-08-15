package com.learnershigh.repository;

import com.learnershigh.dto.etc.AttentionDto;

import java.time.LocalDateTime;
import java.util.List;

public interface AttentionRepositoryCustom {

    // 한 회차당 한 학생의 20구간의 평균 집중도
    List<AttentionDto> aggregateAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);

    // 한 회차당 모든 학생의 20구간의 평균 집중도
    List<AttentionDto> aggregateAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);

    // 한 회차당 한 학생의 1구간의 평균 집중도
    AttentionDto aggregateTotalAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);

    // 한 회차당 모든 학생의 1구간의 평균 집중도
    AttentionDto aggregateTotalAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);

}
