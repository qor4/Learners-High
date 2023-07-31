package com.learnershigh.service;

import com.learnershigh.domain.Class;
import com.learnershigh.domain.ClassType;
import com.learnershigh.domain.StudentClassList;
import com.learnershigh.dto.*;
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

    public ClassJoinDto getWritingClassByClassNo(Long classNo) {
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

    public ClassInfoDto getClassDetailByClassNo(Long classNo) {
        Class classDomain = classRepository.findByClassNo(classNo);
        if (classDomain == null) {
            throw new IllegalStateException("유효한 수업이 아닙니다.");
        }
        ClassInfoDto classInfo = new ClassInfoDto();
        classInfo.setClassNo(classDomain.getClassNo());
        classInfo.setUserNo(classDomain.getUserNo().getUserNo());
        classInfo.setUserName(classDomain.getUserNo().getUserName());
        classInfo.setClassTypeNo(classDomain.getClassTypeNo().getClassTypeNo());
        classInfo.setClassTypeName(classDomain.getClassTypeNo().getClassTypeName());
        classInfo.setClassName(classDomain.getClassName());
        classInfo.setClassStartDate(classDomain.getClassStartDate());
        classInfo.setClassEndDate(classDomain.getClassEndDate());
        classInfo.setClassInfo(classDomain.getClassInfo());
        classInfo.setMaxStudent(classDomain.getMaxStudent());
        classInfo.setTotalStudent(classDomain.getTotalStudent());
        classInfo.setClassPrice(classDomain.getClassPrice());
        classInfo.setClassThumbnailImg(classDomain.getClassThumbnailImg());
        classInfo.setClassThumbnailInfo(classDomain.getClassThumbnailInfo());
        classInfo.setClassStatus(classDomain.getClassStatus());
        classInfo.setClassTotalRound(classDomain.getClassTotalRound());
        return classInfo;
    }
    public List<ClassTypeDto> getClassType() {
        List<ClassType> classTypeList = classTypeRepository.findAll();
        List<ClassTypeDto> classTypeDtoList = new ArrayList<>();
        for(ClassType classType : classTypeList){
            ClassTypeDto classTypeDto = new ClassTypeDto();
            classTypeDto.setClassTypeNo(classType.getClassTypeNo());
            classTypeDto.setClassTypeName(classType.getClassTypeName());
            classTypeDtoList.add(classTypeDto);
        }
        return classTypeDtoList;
    }

    // 조회수 증가
    @Transactional
    public void viewCount(Long classNo)
    {
        Class cla = classRepository.findByClassNo(classNo);

        int currentCount = cla.getClassViewCount();

        currentCount += 1;

        cla.setClassViewCount(currentCount);

    }

    // 메인페이지 TOP5 출력
    public List<ClassListDto> mainTop5(){
        List<Class> classlist = classRepository.findTop5ByOrderByClassViewCountDesc();

        List<ClassListDto> returnlist = new ArrayList<>();

        for(Class cla : classlist)
        {
            ClassListDto clas = new ClassListDto();

            clas.setClassNo(cla.getClassNo());
            clas.setUserName(cla.getUserNo().getUserName());
            clas.setClassName(cla.getClassName());
            clas.setClassPrice(cla.getClassPrice());
            clas.setClassStartDate(cla.getClassStartDate());
            clas.setClassEndDate(cla.getClassEndDate());
            clas.setMaxStudent(cla.getMaxStudent());
            clas.setTotalStudent(cla.getTotalStudent());
            clas.setClassTypeName(cla.getClassTypeNo().getClassTypeName());
            clas.setViewCount(cla.getClassViewCount());

            returnlist.add(clas);

        }
        return returnlist;
    }
}
