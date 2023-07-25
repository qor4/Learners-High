package com.learnershigh.service;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.StudentClassList;
import com.learnershigh.domain.StudentWishlist;
import com.learnershigh.dto.ClassJoinDto;
import com.learnershigh.dto.ClassListDto;
import com.learnershigh.dto.ClassListProjectionInterface;
import com.learnershigh.dto.StudentClassActionDto;
import com.learnershigh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassTypeRepository classTypeRepository;
    private final StudentClassListRepository studentClassListRepository;

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
        classDomain.setClassInfo(classJoinDto.getClassInfo());
        classDomain.setMaxStudent(classJoinDto.getMaxStudent());
        classDomain.setClassPrice(classJoinDto.getClassPrice());
        classDomain.setClassThumbnailImg(classJoinDto.getClassThumbnailImg());
        classDomain.setClassThumbnailInfo(classJoinDto.getClassThumbnailInfo());
        classDomain.setClassStatus(classJoinDto.getClassStatus());
        Class classEntity = classRepository.save(classDomain); // 저장한 객체를 반환함.
        return classEntity;
    }

    public List<ClassListDto> upcomingClassList() {
        List<Class> classList = classRepository.findByUpcomingClass();
        List<ClassListDto> classListDtoList = new ArrayList<>();
        for (Class classDomain : classList) {
            ClassListDto classListDto = new ClassListDto();
            classListDto.setClassNo(classDomain.getClassNo());
            classListDto.setUserNo(classDomain.getUserNo().getUserNo());
            classListDto.setUserName(classDomain.getUserNo().getUserName());
            classListDto.setClassTypeNo(classDomain.getClassTypeNo().getClassTypeNo());
            classListDto.setClassTypeName(classDomain.getClassTypeNo().getClassTypeName());
            classListDto.setClassName(classDomain.getClassName());
            classListDto.setClassStartDate(classDomain.getClassStartDate());
            classListDto.setClassEndDate(classDomain.getClassEndDate());
            classListDto.setMaxStudent(classDomain.getMaxStudent());
            classListDto.setClassPrice(classDomain.getClassPrice());
            classListDto.setClassThumbnailImg(classDomain.getClassThumbnailImg());
            classListDtoList.add(classListDto);
        }
        return classListDtoList;
    }

    public Class isWritingByUserNo(Long userNo) {
        return classRepository.isWritingByUserNo(userNo);
    }

    public ClassJoinDto getInfoByClassNo(Long classNo) {
        Class classDomain = classRepository.findByClassNo(classNo);
        ClassJoinDto classJoin = new ClassJoinDto();
        classJoin.setUserNo(classDomain.getUserNo().getUserNo());
        classJoin.setClassTypeNo(classDomain.getClassTypeNo().getClassTypeNo());
        classJoin.setClassName(classDomain.getClassName());
        classJoin.setClassInfo(classDomain.getClassInfo());
        classJoin.setMaxStudent(classDomain.getMaxStudent());
        classJoin.setClassPrice(classDomain.getClassPrice());
        classJoin.setClassThumbnailImg(classDomain.getClassThumbnailImg());
        classJoin.setClassThumbnailInfo(classDomain.getClassThumbnailInfo());
        classJoin.setClassStatus(classDomain.getClassStatus());
        classJoin.setClassTotalRound(classDomain.getClassTotalRound());
        return classJoin;
    }

    @Transactional
    public void apply(StudentClassActionDto studentClassActionDto) {
        StudentClassList studentClassList = new StudentClassList();
        studentClassList.setUserNo(userRepository.findByUserNo(studentClassActionDto.getUserNo()));
        studentClassList.setClassNo(classRepository.findByClassNo(studentClassActionDto.getClassNo()));

        studentClassListRepository.save(studentClassList);
    }
}
