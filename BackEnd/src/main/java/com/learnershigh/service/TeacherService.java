package com.learnershigh.service;

import com.learnershigh.domain.ClassRound;
import com.learnershigh.dto.MainClassListDto;
import com.learnershigh.repository.ClassRoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeacherService {
    private final ClassRoundRepository classRoundRepository;

    public HashMap<Integer, Object> showWeeklyClassSchedule(Long userNo) {
        HashMap<Integer, Object> data = new HashMap<>();
        for (int i = 1; i <= 7; i++) {
            List<ClassRound> classRoundList = classRoundRepository.getWeeklyClassRoundByTeacher(userNo, Integer.toString(i));
            List<MainClassListDto> mainClassListDtoList = new ArrayList<>();
            for (ClassRound classRound : classRoundList) {
                MainClassListDto mainClassListDto = new MainClassListDto();
                mainClassListDto.setClassRoundNo(classRound.getClassRoundNo());
                mainClassListDto.setClassNo(classRound.getClassNo().getClassNo());
                mainClassListDto.setUserNo(classRound.getClassNo().getUserNo().getUserNo());
                mainClassListDto.setUserName(classRound.getClassNo().getUserNo().getUserName());
                mainClassListDto.setClassName(classRound.getClassNo().getClassName());
                mainClassListDto.setClassRoundNumber(classRound.getClassRoundNumber());
                mainClassListDto.setClassRoundTitle(classRound.getClassRoundTitle());
                mainClassListDto.setClassRoundFileName(classRound.getClassRoundFileName());
                mainClassListDto.setClassRoundFileOriginName(classRound.getClassRoundFileOriginName());
                mainClassListDto.setClassRoundStartDatetime(classRound.getClassRoundStartDatetime());
                mainClassListDto.setClassRoundEndDatetime(classRound.getClassRoundEndDatetime());
                mainClassListDto.setHomework(classRound.isHomework());
                mainClassListDto.setClassRoundClassroom(classRound.getClassRoundClassroom());
                mainClassListDtoList.add(mainClassListDto);
            }
            data.put(i, mainClassListDtoList);
        }
        return data;
    }
}
