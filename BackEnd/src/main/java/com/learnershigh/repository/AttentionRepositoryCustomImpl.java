package com.learnershigh.repository;

import com.learnershigh.dto.etc.AttentionDto;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

public class AttentionRepositoryCustomImpl implements AttentionRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public AttentionRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    // 한 회차당 한 학생의 20구간의 평균 집중도
    public List<AttentionDto> aggregateAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {

        startDatetime = startDatetime.minusHours(9L);
        endDatetime = endDatetime.minusHours(9L);
        Date startDate = Date.from(Instant.parse(startDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        Date endDate = Date.from(Instant.parse(endDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));

        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lte(endDate).and("metadata.lessonRoundNo").is(lessonRoundNo) // lessonRoundNo
                                .and("metadata.userNo").is(userNo)
                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 20)
                .andOutput("rate").avg().as("avgValue")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(0))
                                .then(1).otherwise(0)).sum()).as("count0")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(1))
                                .then(1).otherwise(0)).sum()).as("count1")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(2))
                                .then(1).otherwise(0)).sum()).as("count2");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );
        AggregationResults<AttentionDto> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", AttentionDto.class);
        List<AttentionDto> attentionList = results.getMappedResults();
        return attentionList;
    }

    // 한 회차당 모든 학생의 20구간의 평균 집중도
    @Override
    public List<AttentionDto> aggregateAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        startDatetime = startDatetime.minusHours(9L);
        endDatetime = endDatetime.minusHours(9L);
        Date startDate = Date.from(Instant.parse(startDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        Date endDate = Date.from(Instant.parse(endDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lt(endDate).and("metadata.lessonRoundNo").is(lessonRoundNo) // lessonRoundNo
                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 20)
                .andOutput("rate").avg().as("avgValue")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(0))
                                .then(1).otherwise(0)).sum()).as("count0")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(1))
                                .then(1).otherwise(0)).sum()).as("count1")
                .andOutput(AccumulatorOperators.valueOf(
                        ConditionalOperators.when(Criteria.where("metadata.status").is(2))
                                .then(1).otherwise(0)).sum()).as("count2");

        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );

        AggregationResults<AttentionDto> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", AttentionDto.class);
        List<AttentionDto> attentionList = results.getMappedResults();
        return attentionList;
    }

    // 한 회차당 한 학생의 1구간의 평균 집중도
    @Override
    public AttentionDto aggregateTotalAttentionByLessonRoundNoAndUserNo(Long userNo, Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        startDatetime = startDatetime.minusHours(9L);
        endDatetime = endDatetime.minusHours(9L);
        Date startDate = Date.from(Instant.parse(startDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        Date endDate = Date.from(Instant.parse(endDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lt(endDate).and("metadata.lessonRoundNo").is(lessonRoundNo) // lessonRoundNo
                                .and("metadata.userNo").is(userNo)
                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 1)
                .andOutput("rate").avg().as("avgValue");

        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );

        AggregationResults<AttentionDto> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", AttentionDto.class);
        List<AttentionDto> attentionList = results.getMappedResults();
        if(attentionList.size()==0){
            return null;
        }

        return attentionList.get(0);
    }

    // 한 회차당 모든 학생의 1구간의 평균 집중도
    @Override
    public AttentionDto aggregateTotalAttentionByLessonRoundNo(Long lessonRoundNo, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        startDatetime = startDatetime.minusHours(9L);
        endDatetime = endDatetime.minusHours(9L);
        Date startDate = Date.from(Instant.parse(startDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        Date endDate = Date.from(Instant.parse(endDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        MatchOperation matchOperation =
                Aggregation.match(
                        Criteria.where("timestamp")
                                .gte(startDate)
                                .lt(endDate).and("metadata.lessonRoundNo").is(lessonRoundNo) // lessonRoundNo
                );
        BucketAutoOperation bucketAutoOperation = Aggregation.bucketAuto("timestamp", 1)
                .andOutput("rate").avg().as("avgValue");

        Aggregation aggregation = Aggregation.newAggregation(matchOperation,
                bucketAutoOperation
        );

        AggregationResults<AttentionDto> results = mongoTemplate.aggregate(aggregation, "lesson_round_attention_rate", AttentionDto.class);
        List<AttentionDto> attentionList = results.getMappedResults();
        if(attentionList.size()==0){
            return null;
        }

        return attentionList.get(0);
    }
}
