package com.learnershigh.repository;

import com.learnershigh.dto.etc.AttentionDto;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class AttentionRepositoryCustomImpl implements AttentionRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public AttentionRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Object> aggregateAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {
/*
    $match: {
      "timestamp": {
        $gte: new Date("2023-08-11T04:10:00Z"),
        $lt: new Date("2023-08-11T04:16:00Z")
      },
      "metadata.lessonRoundNo": {
        $eq: 21
      }
    }
  },
  {
    $bucketAuto: {
      groupBy: "$timestamp",
      buckets: 20,  // 필요에 따라 버킷 개수를 조정하세요
      output: {
        avg_value: { $avg: "$rate" }
      }
    }
  }
])
         */
        Date startDate = Date.from(Instant.parse("2023-08-11T04:10:00Z"));
        Date endDate = Date.from(Instant.parse("2023-08-11T04:16:00Z"));
        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lt(endDate).and("metadata.lessonRoundNo").is(1) // lessonRoundNo
                                .and("metadate.userNo").is(1)
                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 20)
                .andOutput("rate").avg().as("avg_value");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );
        AggregationResults<Object> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", Object.class);
        List<Object> objectList = results.getMappedResults();
        return objectList;
    }


    // 한회차당 모든 학생 평균 (20구간)
    @Override
    public List<AttentionDto> aggregateAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {

        Date startDate = Date.from(Instant.parse("2023-08-13T09:39:12.317Z"));
        Date endDate = Date.from(Instant.parse("2023-08-13T09:39:19.599Z"));
        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lt(endDate).and("metadata.lessonRoundNo").is(1) // lessonRoundNo

                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 20)
                .andOutput("rate").avg().as("avg_value");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );
        AggregationResults<AttentionDto> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", AttentionDto.class);
        List<AttentionDto> objectList = results.getMappedResults();
        return objectList;
    }
}
