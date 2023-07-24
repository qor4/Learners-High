package com.learnershigh.service;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.ClassRound;
import com.learnershigh.dto.ClassRoundJoinDto;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.ClassRoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClassRoundService {

    private final ClassRepository classRepository;
    private final ClassRoundRepository classRoundRepository;

    // 강의 회차 정보 추가
    @Transactional
    public void classRoundJoin(List<ClassRoundJoinDto> classRoundJoinDtoList) {
        List<ClassRound> classRoundList = classRoundRepository.findByClassNo(classRoundJoinDtoList.get(0).getClassNo());
        for(ClassRound classRound : classRoundList){
            System.out.println(classRound.getClassRoundTitle());
            classRoundRepository.delete(classRound);
        }
        for (ClassRoundJoinDto classRoundJoinDto : classRoundJoinDtoList) {
            ClassRound classRound = new ClassRound();
            if (classRepository.findByClassNo(classRoundJoinDto.getClassNo()) == null) {
                throw new IllegalStateException("유효한 수업이 아닙니다.");
            }
            // 수업 회차가 0회차 일 때
            if (classRoundJoinDto.getClassRoundNumber() == 0) {
                throw new IllegalStateException("수업 회차가 유효하지 않습니다.");
            }
            if (classRoundJoinDto.getClassRoundTitle().isBlank()) {
                throw new IllegalStateException("수업 이름을 입력해주세요.");
            }
            if (classRoundJoinDto.getClassRoundStartDatetime() == null) {
                throw new IllegalStateException("수업 시작 일시가 올바르지 않습니다.");
            }
            if (classRoundJoinDto.getClassRoundEndDatetime() == null) {
                throw new IllegalStateException("수업 종료 일시가 올바르지 않습니다.");
            }
            // 회차 정보 저장
            classRound.setClassNo(classRepository.findByClassNo(classRoundJoinDto.getClassNo()));
            classRound.setClassRoundNumber(classRoundJoinDto.getClassRoundNumber());
            classRound.setClassRoundTitle(classRoundJoinDto.getClassRoundTitle());
            classRound.setClassRoundFileName(classRoundJoinDto.getClassRoundFileName());
            classRound.setClassRoundFileOriginName(classRoundJoinDto.getClassRoundFileOriginName());
            classRound.setClassRoundStartDatetime(classRoundJoinDto.getClassRoundStartDatetime());
            classRound.setClassRoundEndDatetime(classRoundJoinDto.getClassRoundEndDatetime());
            classRound.setHomework(classRoundJoinDto.isHomework());
            classRoundRepository.save(classRound);
        }
        // 회차 정보를 통해 수업의 시작, 종료 날짜 설정
        Class classEntity = classRepository.findByClassNo(classRoundJoinDtoList.get(0).getClassNo());
        classEntity.setClassStartDate(classRoundJoinDtoList.get(0).getClassRoundStartDatetime().toLocalDate());
        classEntity.setClassEndDate(classRoundJoinDtoList.get(classRoundJoinDtoList.size() - 1).getClassRoundStartDatetime().toLocalDate());
        classRepository.save(classEntity);
    }
}
