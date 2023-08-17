package com.learnershigh.service.lesson;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.dto.lesson.LessonRoundDetailDto;
import com.learnershigh.dto.lesson.LessonRoundJoinDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LessonRoundService {

    private final LessonRepository lessonRepository;
    private final LessonRoundRepository lessonRoundRepository;

    // 강의 회차 정보 추가
    @Transactional(noRollbackFor= Exception.class)
    public List<HashMap<String, Object>> lessonRoundJoin(List<LessonRoundJoinDto> lessonRoundJoinDtoList) {
        List<HashMap<String, Object>> result = new ArrayList<>();
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonRoundJoinDtoList.get(0).getLessonNo());
        lessonRoundRepository.deleteAll(lessonRoundList);
        if (lessonRoundJoinDtoList.size() == 0) {
            throw new IllegalStateException("최소 하나 이상의 회차를 입력해주세요.");
        }
        Lesson lessonEntity = lessonRepository.findByLessonNo(lessonRoundJoinDtoList.get(0).getLessonNo());
        LocalDate now = LocalDate.now();
        if(lessonRoundJoinDtoList.get(0).getLessonRoundStartDatetime().toLocalDate().isBefore(now.plusDays(6))){
            lessonEntity.setLessonStatus("작성 중");
            lessonRepository.save(lessonEntity);
            throw new IllegalStateException("수업 시작 일시는 현재 날짜에서 7일 이후부터 가능합니다.");
        }
        for (LessonRoundJoinDto lessonRoundJoinDto : lessonRoundJoinDtoList) {
            LessonRound lessonRound = new LessonRound();
            if (lessonRepository.findByLessonNo(lessonRoundJoinDto.getLessonNo()) == null) {
                lessonEntity.setLessonStatus("작성 중");
                lessonRepository.save(lessonEntity);
                throw new IllegalStateException("유효한 수업이 아닙니다.");
            }
            // 수업 회차가 0회차 일 때
            if (lessonRoundJoinDto.getLessonRoundNumber() == 0) {
                lessonEntity.setLessonStatus("작성 중");
                lessonRepository.save(lessonEntity);
                throw new IllegalStateException("수업 회차가 유효하지 않습니다.");
            }
            if (lessonRoundJoinDto.getLessonRoundTitle().isBlank()) {
                lessonEntity.setLessonStatus("작성 중");
                lessonRepository.save(lessonEntity);
                throw new IllegalStateException("수업 이름을 입력해주세요.");
            }
            if (lessonRoundJoinDto.getLessonRoundStartDatetime() == null) {
                lessonEntity.setLessonStatus("작성 중");
                lessonRepository.save(lessonEntity);
                throw new IllegalStateException("수업 시작 일시가 올바르지 않습니다.");
            }
            if (lessonRoundJoinDto.getLessonRoundEndDatetime() == null) {
                lessonEntity.setLessonStatus("작성 중");
                lessonRepository.save(lessonEntity);
                throw new IllegalStateException("수업 종료 일시가 올바르지 않습니다.");
            }
            // 회차 정보 저장
            lessonRound.setLessonNo(lessonRepository.findByLessonNo(lessonRoundJoinDto.getLessonNo()));
            lessonRound.setLessonRoundNumber(lessonRoundJoinDto.getLessonRoundNumber());
            lessonRound.setLessonRoundTitle(lessonRoundJoinDto.getLessonRoundTitle());
            lessonRound.setLessonRoundStartDatetime(lessonRoundJoinDto.getLessonRoundStartDatetime());
            lessonRound.setLessonRoundEndDatetime(lessonRoundJoinDto.getLessonRoundEndDatetime());
            LessonRound joinLessonRound = lessonRoundRepository.save(lessonRound);
            HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("lessonRoundNo", joinLessonRound.getLessonRoundNo());
            hashMap.put("lessonRoundNumber", joinLessonRound.getLessonRoundNumber());
            result.add(hashMap);
        }
        // 회차 정보를 통해 수업의 시작, 종료 날짜 설정
        lessonEntity.setLessonStartDate(lessonRoundJoinDtoList.get(0).getLessonRoundStartDatetime().toLocalDate());
        lessonEntity.setLessonEndDate(lessonRoundJoinDtoList.get(lessonRoundJoinDtoList.size() - 1).getLessonRoundStartDatetime().toLocalDate());
        lessonEntity.setLessonTotalRound(lessonRoundJoinDtoList.size());
        lessonRepository.save(lessonEntity);

        return result;
    }

    public List<LessonRoundJoinDto> getWritingLessonRoundByLessonNo(Long lessonNo) {
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);
        List<LessonRoundJoinDto> lessonRoundJoinDtoList = new ArrayList<>();
        for (LessonRound lessonRound : lessonRoundList) {
            LessonRoundJoinDto lessonRoundJoinDto = new LessonRoundJoinDto();
            lessonRoundJoinDto.setLessonNo(lessonRound.getLessonNo().getLessonNo());
            lessonRoundJoinDto.setLessonRoundNumber(lessonRound.getLessonRoundNumber());
            lessonRoundJoinDto.setLessonRoundTitle(lessonRound.getLessonRoundTitle());
            lessonRoundJoinDto.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
            lessonRoundJoinDto.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
            lessonRoundJoinDtoList.add(lessonRoundJoinDto);
        }
        return lessonRoundJoinDtoList;
    }

    public List<LessonRoundDetailDto> getLessonRoundDetailByLessonNo(Long lessonNo) {
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);
        List<LessonRoundDetailDto> lessonRoundDetailDtoList = new ArrayList<>();
        for (LessonRound lessonRound : lessonRoundList) {
            LessonRoundDetailDto lessonRoundDetail = new LessonRoundDetailDto();
            lessonRoundDetail.setLessonRoundNo(lessonRound.getLessonRoundNo());
            lessonRoundDetail.setLessonRoundNumber(lessonRound.getLessonRoundNumber());
            lessonRoundDetail.setLessonRoundTitle(lessonRound.getLessonRoundTitle());
            lessonRoundDetail.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
            lessonRoundDetail.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
            lessonRoundDetailDtoList.add(lessonRoundDetail);
        }
        return lessonRoundDetailDtoList;
    }

}
