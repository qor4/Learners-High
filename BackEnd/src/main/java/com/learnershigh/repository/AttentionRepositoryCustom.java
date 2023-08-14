package com.learnershigh.repository;

import com.learnershigh.dto.etc.AttentionDto;

import java.time.LocalDateTime;
import java.util.List;

public interface AttentionRepositoryCustom {
    List<AttentionDto> aggregateAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);


    // (학생) 한수업의 한회차당 학생 모든 집중도 20구간
    List<AttentionDto> aggregateAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);

}
