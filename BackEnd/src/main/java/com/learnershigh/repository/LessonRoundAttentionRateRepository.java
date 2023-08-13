package com.learnershigh.repository;

import com.learnershigh.domain.LessonRoundAttentionRate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LessonRoundAttentionRateRepository extends MongoRepository<LessonRoundAttentionRate, String>, AttentionRepositoryCustom {
}

