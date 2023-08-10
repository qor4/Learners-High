package com.seeso.repository;

import com.seeso.domain.LessonRoundAttentionRate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LessonRoundAttentionRateRepository extends MongoRepository<LessonRoundAttentionRate, String> {
//    List<LessonRoundAttentionRate> findBy();
}

