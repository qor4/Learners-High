package com.learnershigh.repository;

import java.time.LocalDateTime;
import java.util.List;

public interface AttentionRepositoryCustom {
    List<Object> aggregateAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime);
}
