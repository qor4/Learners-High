package com.learnershigh.service;

import com.learnershigh.domain.*;
import com.learnershigh.domain.Class;
import com.learnershigh.dto.*;
import com.learnershigh.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudentService {

    private final StudentWishlistRepository studentWishlistRepository;
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final ClassRoundRepository classRoundRepository;
    private final StudentClassListRepository studentClassListRepository;
    private final ClassHomeworkRepository classHomeworkRepository;

    @Transactional
    public void wish(StudentClassActionDto studentClassActionDto) {
        StudentWishlist studentWishlist = new StudentWishlist();
        studentWishlist.setUserNo(userRepository.findByUserNo(studentClassActionDto.getUserNo()));
        studentWishlist.setClassNo(classRepository.findByClassNo(studentClassActionDto.getClassNo()));

        studentWishlistRepository.save(studentWishlist);
    }

    @Transactional
    public void deleteWish(Long userNo, Long classNo) {
        StudentWishlist studentWishlist = studentWishlistRepository.findByUserNoAndClassNo(userNo, classNo);
        if (studentWishlist == null) {
            throw new BadCredentialsException("잘못된 위시 정보입니다.");
        }
        studentWishlistRepository.delete(studentWishlist);
    }

    public HashMap<Integer, Object> showWeeklyClassSchedule(Long userNo) {
        HashMap<Integer, Object> data = new HashMap<>();
        for (int i = 1; i <= 7; i++) {
            List<ClassRound> classRoundList = classRoundRepository.getWeeklyClassRoundByStudent(userNo, Integer.toString(i));
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

    // 학생 찜 목록 전체 출력
    public List<ClassListDto> wishListAll(User userNo) {


        System.out.println(userNo);

        List<StudentWishlist> studentWishlist = studentWishlistRepository.findAllByUserNo(userNo);

        System.out.println(studentWishlist.toString());

        List<ClassListDto> wishClassList = new ArrayList<>();


        for (StudentWishlist sw : studentWishlist) {

            ClassListDto classListDto = new ClassListDto();

            Class wishClass = classRepository.findByClassNo(sw.getClassNo().getClassNo());


            // 리스트 넣기
            classListDto.setClassTypeName(wishClass.getClassTypeNo().getClassTypeName());
            classListDto.setClassName(wishClass.getClassName());
            classListDto.setClassPrice(wishClass.getClassPrice());
            classListDto.setUserName(wishClass.getUserNo().getUserName());
            classListDto.setClassStartDate(wishClass.getClassStartDate());
            classListDto.setClassEndDate(wishClass.getClassEndDate());
            classListDto.setClassThumbnailImg(wishClass.getClassThumbnailImg());
            classListDto.setMaxStudent(wishClass.getMaxStudent());
            classListDto.setTotalStudent(wishClass.getTotalStudent());

            wishClassList.add(classListDto);

        }

        return wishClassList;

    }

    // 학생 수강 목록 전체 출력
    public List<ClassListDto> userClassAll(Long userNo) {
        User user = userRepository.findByUserNo(userNo);

        List<StudentClassList> userclasslist = studentClassListRepository.findAllByUserNo(user);

        System.out.println(userclasslist.toString());

        List<ClassListDto> clalist = new ArrayList<>();

        for (StudentClassList classAll : userclasslist) {

            ClassListDto cla = new ClassListDto();

            cla.setClassStartDate(classAll.getClassNo().getClassStartDate());
            cla.setClassEndDate(classAll.getClassNo().getClassEndDate());
            cla.setUserName(classAll.getClassNo().getClassName());

            clalist.add(cla);
        }

        return clalist;
    }

    public StudentAttendHomeworkDto getStudentAttendHomeworkInfo(Long userNo, Long classNo) throws IllegalAccessException {
        User user = userRepository.findByUserNo(userNo);
        if (user == null) {
            throw new IllegalAccessException("유효하지 않은 사용자입니다.");
        }
        StudentAttendHomeworkDto studentAttendHomework = new StudentAttendHomeworkDto();
        List<AttendHomeworkProjectionInterface> attendHomeworkList = classHomeworkRepository.getAttendHomeworkByUserNo(userNo, classNo);
        studentAttendHomework.setUserNo(user.getUserNo());
        studentAttendHomework.setUserName(user.getUserName());
        studentAttendHomework.setAttendHomeworkList(attendHomeworkList);
        return studentAttendHomework;
    }

    public List<HashMap<String, Object>> getClassRoundFileInfo(Long classNo) {
        List<HashMap<String, Object>> classRoundfileInfo = new ArrayList<>();
        List<ClassRound> classRoundList = classRoundRepository.findByClassNo(classNo);
        for(ClassRound classRound:classRoundList){
            HashMap<String, Object> fileInfo = new HashMap<>();
            fileInfo.put("classRoundNo", classRound.getClassRoundNo());
            fileInfo.put("classRoundNumber", classRound.getClassRoundNumber());
            fileInfo.put("classRoundTitle", classRound.getClassRoundTitle());
            fileInfo.put("classRoundFileName", classRound.getClassRoundFileName());
            fileInfo.put("classRoundFileOriginName", classRound.getClassRoundFileOriginName());
            classRoundfileInfo.add(fileInfo);
        }
        return classRoundfileInfo;
    }
}
