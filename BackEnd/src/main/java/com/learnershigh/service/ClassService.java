package com.learnershigh.service;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.User;
import com.learnershigh.dto.ClassJoinDto;
import com.learnershigh.repository.ClassRepository;
import com.learnershigh.repository.ClassTypeRepository;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassTypeRepository classTypeRepository;

    // 강의 개설 (강의 정보 insert)
    @Transactional
    public Class classJoin(ClassJoinDto classJoinDto) {
        Class classDomain = new Class();
        if (classJoinDto.getUserNo() == null || userRepository.findByUserNo(classJoinDto.getUserNo()) == null) {
            throw new IllegalStateException("사용자가 유효하지 않습니다.");
        }
        // 수업 분류가 0일 경우 어떻게 처리할 것인지
        if (classJoinDto.getClassTypeNo() == 0 || classTypeRepository.findByClassTypeNo(classJoinDto.getClassTypeNo()) == null) {
            throw new IllegalStateException("수업 분류가 유효하지 않습니다.");
        }
        if (classJoinDto.getClassName().isBlank()) {
            throw new IllegalStateException("수업 이름을 입력해주세요.");
        }
        if (classJoinDto.getClassStartDate() == null) {
            throw new IllegalStateException("수업 시작 날짜를 선택해주세요.");
        }
        if (classJoinDto.getClassEndDate() == null) {
            throw new IllegalStateException("수업 종료 날짜를 선택해주세요.");
        }
        if (classJoinDto.getMaxStudent() == 0) {
            throw new IllegalStateException("최대 수강 학생 수를 올바르게 입력해주세요.");
        }
        // 수업이 0원일 경우 어떻게 처리할 것인지
        if (classJoinDto.getClassPrice() == 0) {
            throw new IllegalStateException("수업 가격을 올바르게 입력해주세요.");
        }
        // 강의 정보 저장
        classDomain.setClassName(classJoinDto.getClassName());
        classDomain.setUserNo(userRepository.findByUserNo(classJoinDto.getUserNo()));
        classDomain.setClassTypeNo(classTypeRepository.findByClassTypeNo(classJoinDto.getClassTypeNo()));
        classDomain.setClassName(classJoinDto.getClassName());
        classDomain.setClassStartDate(classJoinDto.getClassStartDate());
        classDomain.setClassEndDate(classJoinDto.getClassEndDate());
        classDomain.setClassInfo(classJoinDto.getClassInfo());
        classDomain.setMaxStudent(classJoinDto.getMaxStudent());
        classDomain.setClassPrice(classJoinDto.getClassPrice());
        classDomain.setClassThumbnailImg(classJoinDto.getClassThumbnailImg());
        classDomain.setClassThumbnailInfo(classJoinDto.getClassThumbnailInfo());
        classDomain.setClassStatus(classJoinDto.getClassStatus());
        Class classEntity = classRepository.save(classDomain); // 저장한 객체를 반환함.
        return classEntity;
    }
}
