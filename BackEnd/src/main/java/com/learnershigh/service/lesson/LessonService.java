package com.learnershigh.service.lesson;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonType;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lesson.LessonInfoDto;
import com.learnershigh.dto.lesson.LessonJoinDto;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lesson.LessonTypeDto;
import com.learnershigh.dto.lessonhub.StudentLessonActionDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonTypeRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final LessonTypeRepository lessonTypeRepository;
    private final StudentLessonListRepository studentLessonListRepository;

    // 강의 개설 (강의 정보 insert)
    @Transactional
    public Lesson lessonJoin(LessonJoinDto lessonJoinDto) {
        Lesson lessonDomain = new Lesson();
        if (lessonJoinDto.getUserNo() == null || userRepository.findByUserNo(lessonJoinDto.getUserNo()) == null) {
            throw new IllegalStateException("사용자가 유효하지 않습니다.");
        }
        // 수업 분류가 0일 경우 어떻게 처리할 것인지
        if (lessonJoinDto.getLessonTypeNo() == 0 || lessonTypeRepository.findByLessonTypeNo(lessonJoinDto.getLessonTypeNo()) == null) {
            throw new IllegalStateException("수업 분류가 유효하지 않습니다.");
        }
        if (lessonJoinDto.getLessonName().isBlank()) {
            throw new IllegalStateException("수업 이름을 입력해주세요.");
        }
        if (lessonJoinDto.getMaxStudent() == 0) {
            throw new IllegalStateException("최대 수강 학생 수를 올바르게 입력해주세요.");
        }
        // 수업이 0원일 경우 어떻게 처리할 것인지
        if (lessonJoinDto.getLessonPrice() == 0) {
            throw new IllegalStateException("수업 가격을 올바르게 입력해주세요.");
        }
        // 강의 정보 저장
        lessonDomain.setLessonName(lessonJoinDto.getLessonName());
        lessonDomain.setUserNo(userRepository.findByUserNo(lessonJoinDto.getUserNo()));
        lessonDomain.setLessonTypeNo(lessonTypeRepository.findByLessonTypeNo(lessonJoinDto.getLessonTypeNo()));
        lessonDomain.setLessonInfo(lessonJoinDto.getLessonInfo());
        lessonDomain.setMaxStudent(lessonJoinDto.getMaxStudent());
        lessonDomain.setLessonPrice(lessonJoinDto.getLessonPrice());
        lessonDomain.setLessonThumbnailInfo(lessonJoinDto.getLessonThumbnailInfo());
        lessonDomain.setLessonStatus(lessonJoinDto.getLessonStatus());
        Lesson lessonEntity = lessonRepository.save(lessonDomain); // 저장한 객체를 반환함.
        return lessonEntity;
    }

    public List<LessonListDto> upcomingLessonList() {
        List<Lesson> lessonList = lessonRepository.findByUpcomingLesson();
        List<LessonListDto> lessonListDtoList = new ArrayList<>();
        for (Lesson lessonDomain : lessonList) {
            LessonListDto lessonListDto = new LessonListDto();
            lessonListDto.setLessonNo(lessonDomain.getLessonNo());
            lessonListDto.setUserNo(lessonDomain.getUserNo().getUserNo());
            lessonListDto.setUserName(lessonDomain.getUserNo().getUserName());
            lessonListDto.setLessonTypeNo(lessonDomain.getLessonTypeNo().getLessonTypeNo());
            lessonListDto.setLessonTypeName(lessonDomain.getLessonTypeNo().getLessonTypeName());
            lessonListDto.setLessonName(lessonDomain.getLessonName());
            lessonListDto.setLessonStartDate(lessonDomain.getLessonStartDate());
            lessonListDto.setLessonEndDate(lessonDomain.getLessonEndDate());
            lessonListDto.setMaxStudent(lessonDomain.getMaxStudent());
            lessonListDto.setLessonPrice(lessonDomain.getLessonPrice());
            lessonListDtoList.add(lessonListDto);
        }
        return lessonListDtoList;
    }

    public Lesson isWritingByUserNo(Long userNo) {
        return lessonRepository.isWritingByUserNo(userNo);
    }

    public LessonJoinDto getWritingLessonByLessonNo(Long lessonNo) {
        Lesson lessonDomain = lessonRepository.findByLessonNo(lessonNo);
        LessonJoinDto lessonJoin = new LessonJoinDto();
        lessonJoin.setUserNo(lessonDomain.getUserNo().getUserNo());
        lessonJoin.setLessonTypeNo(lessonDomain.getLessonTypeNo().getLessonTypeNo());
        lessonJoin.setLessonName(lessonDomain.getLessonName());
        lessonJoin.setLessonInfo(lessonDomain.getLessonInfo());
        lessonJoin.setMaxStudent(lessonDomain.getMaxStudent());
        lessonJoin.setLessonPrice(lessonDomain.getLessonPrice());
        lessonJoin.setLessonThumbnailInfo(lessonDomain.getLessonThumbnailInfo());
        lessonJoin.setLessonStatus(lessonDomain.getLessonStatus());
        lessonJoin.setLessonTotalRound(lessonDomain.getLessonTotalRound());
        return lessonJoin;
    }

    @Transactional
    public void apply(StudentLessonActionDto studentLessonActionDto) {
        StudentLessonList studentLessonList = new StudentLessonList();
        User user = userRepository.findByUserNo(studentLessonActionDto.getUserNo());

        if(user == null){
            throw new IllegalStateException("유효한 회원이 아닙니다.");
        }
        if (!user.getUserType().equals("S")) {
            throw new IllegalStateException("수강신청은 학생만 가능합니다.");
        }
        Lesson lesson = lessonRepository.findByLessonNo(studentLessonActionDto.getLessonNo());
        if (lesson == null) {
            throw new IllegalStateException("유효한 수업이 아닙니다.");
        }
        if (!lesson.getLessonStatus().equals("강의 전")) {
            throw new IllegalStateException("수강이 가능한 날짜가 아닙니다.");
        }
        if (lesson.getTotalStudent() == lesson.getMaxStudent()) {
            throw new IllegalStateException("수강 인원이 모두 모집되었습니다.");
        }
        StudentLessonList studentLesson = studentLessonListRepository.findByLessonNoAndUserNo(lesson, user);
        if(studentLesson != null){
            throw new IllegalStateException("이미 수강 중인 과목입니다.");
        }
        studentLessonList.setUserNo(user);
        studentLessonList.setLessonNo(lesson);
        studentLessonListRepository.save(studentLessonList);
        int totalStudent = lesson.getTotalStudent() + 1;
        lesson.setTotalStudent(totalStudent);
        lessonRepository.save(lesson);
    }

    public LessonInfoDto getLessonDetailByLessonNo(Long lessonNo) {
        Lesson lessonDomain = lessonRepository.findByLessonNo(lessonNo);
        if (lessonDomain == null) {
            throw new IllegalStateException("유효한 수업이 아닙니다.");
        }
        LessonInfoDto lessonInfo = new LessonInfoDto();
        lessonInfo.setLessonNo(lessonDomain.getLessonNo());
        lessonInfo.setUserNo(lessonDomain.getUserNo().getUserNo());
        lessonInfo.setUserName(lessonDomain.getUserNo().getUserName());
        lessonInfo.setLessonTypeNo(lessonDomain.getLessonTypeNo().getLessonTypeNo());
        lessonInfo.setLessonTypeName(lessonDomain.getLessonTypeNo().getLessonTypeName());
        lessonInfo.setLessonName(lessonDomain.getLessonName());
        lessonInfo.setLessonStartDate(lessonDomain.getLessonStartDate());
        lessonInfo.setLessonEndDate(lessonDomain.getLessonEndDate());
        lessonInfo.setLessonInfo(lessonDomain.getLessonInfo());
        lessonInfo.setMaxStudent(lessonDomain.getMaxStudent());
        lessonInfo.setTotalStudent(lessonDomain.getTotalStudent());
        lessonInfo.setLessonPrice(lessonDomain.getLessonPrice());
        lessonInfo.setLessonThumbnailInfo(lessonDomain.getLessonThumbnailInfo());
        lessonInfo.setLessonStatus(lessonDomain.getLessonStatus());
        lessonInfo.setLessonTotalRound(lessonDomain.getLessonTotalRound());
        return lessonInfo;
    }

    public List<LessonTypeDto> getLessonType() {
        List<LessonType> lessonTypeList = lessonTypeRepository.findAll();
        List<LessonTypeDto> lessonTypeDtoList = new ArrayList<>();
        for (LessonType lessonType : lessonTypeList) {
            LessonTypeDto lessonTypeDto = new LessonTypeDto();
            lessonTypeDto.setLessonTypeNo(lessonType.getLessonTypeNo());
            lessonTypeDto.setLessonTypeName(lessonType.getLessonTypeName());
            lessonTypeDtoList.add(lessonTypeDto);
        }
        return lessonTypeDtoList;
    }

    // 조회수 증가
    @Transactional
    public void viewCount(Long lessonNo) {
        Lesson cla = lessonRepository.findByLessonNo(lessonNo);

        int currentCount = cla.getLessonViewCount();

        currentCount += 1;

        cla.setLessonViewCount(currentCount);

    }

    // 메인페이지 TOP5 출력
    public List<LessonListDto> mainTop5() {
        List<Lesson> lessonlist = lessonRepository.findTop5ByOrderByLessonViewCountDesc();

        List<LessonListDto> returnlist = new ArrayList<>();

        for (Lesson cla : lessonlist) {
            LessonListDto clas = new LessonListDto();

            clas.setLessonNo(cla.getLessonNo());
            clas.setUserName(cla.getUserNo().getUserName());
            clas.setLessonName(cla.getLessonName());
            clas.setLessonPrice(cla.getLessonPrice());
            clas.setLessonStartDate(cla.getLessonStartDate());
            clas.setLessonEndDate(cla.getLessonEndDate());
            clas.setMaxStudent(cla.getMaxStudent());
            clas.setTotalStudent(cla.getTotalStudent());
            clas.setLessonTypeName(cla.getLessonTypeNo().getLessonTypeName());
            clas.setViewCount(cla.getLessonViewCount());

            returnlist.add(clas);

        }
        return returnlist;
    }
}
