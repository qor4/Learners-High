package com.learnershigh.service.user;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lessonhub.StudentLessonList;
import com.learnershigh.domain.lessonhub.StudentWishlist;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.lesson.LessonListDto;
import com.learnershigh.dto.lesson.LessonMainListDto;
import com.learnershigh.dto.lessonhub.AttendHomeworkProjectionInterface;
import com.learnershigh.dto.lessonhub.StudentAttendHomeworkDto;
import com.learnershigh.dto.lessonhub.StudentLessonActionDto;
import com.learnershigh.repository.lesson.LessonRepository;
import com.learnershigh.repository.lesson.LessonRoundRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.lessonhub.StudentWishlistRepository;
import com.learnershigh.repository.user.UserRepository;
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
    private final LessonRepository lessonRepository;
    private final LessonRoundRepository lessonRoundRepository;
    private final StudentLessonListRepository studentLessonListRepository;
    private final LessonHomeworkRepository lessonHomeworkRepository;

    @Transactional
    public void wish(StudentLessonActionDto studentLessonActionDto) {
        StudentWishlist studentWishlist = new StudentWishlist();
        studentWishlist.setUserNo(userRepository.findByUserNo(studentLessonActionDto.getUserNo()));
        studentWishlist.setLessonNo(lessonRepository.findByLessonNo(studentLessonActionDto.getLessonNo()));

        studentWishlistRepository.save(studentWishlist);
    }

    @Transactional
    public void deleteWish(Long userNo, Long lessonNo) {
        StudentWishlist studentWishlist = studentWishlistRepository.findByUserNoAndLessonNo(userNo, lessonNo);
        if (studentWishlist == null) {
            throw new BadCredentialsException("잘못된 위시 정보입니다.");
        }
        studentWishlistRepository.delete(studentWishlist);
    }

    public HashMap<Integer, Object> showWeeklyLessonSchedule(Long userNo) {
        HashMap<Integer, Object> data = new HashMap<>();
        for (int i = 1; i <= 7; i++) {
            List<LessonRound> lessonRoundList = lessonRoundRepository.getWeeklyLessonRoundByStudent(userNo, Integer.toString(i));
            List<LessonMainListDto> lessonListDtoMainList = new ArrayList<>();
            for (LessonRound lessonRound : lessonRoundList) {
                LessonMainListDto lessonMainListDto = new LessonMainListDto();
                lessonMainListDto.setLessonRoundNo(lessonRound.getLessonRoundNo());
                lessonMainListDto.setLessonNo(lessonRound.getLessonNo().getLessonNo());
                lessonMainListDto.setUserNo(lessonRound.getLessonNo().getUserNo().getUserNo());
                lessonMainListDto.setUserName(lessonRound.getLessonNo().getUserNo().getUserName());
                lessonMainListDto.setLessonName(lessonRound.getLessonNo().getLessonName());
                lessonMainListDto.setLessonRoundNumber(lessonRound.getLessonRoundNumber());
                lessonMainListDto.setLessonRoundTitle(lessonRound.getLessonRoundTitle());
                lessonMainListDto.setLessonRoundFileName(lessonRound.getLessonRoundFileName());
                lessonMainListDto.setLessonRoundFileOriginName(lessonRound.getLessonRoundFileOriginName());
                lessonMainListDto.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
                lessonMainListDto.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
                lessonMainListDto.setHomework(lessonRound.isHomework());
                lessonMainListDto.setLessonRoundLessonroom(lessonRound.getLessonRoundLessonroom());
                lessonListDtoMainList.add(lessonMainListDto);
            }
            data.put(i, lessonListDtoMainList);
        }
        return data;
    }

    // 학생 찜 목록 전체 출력
    public List<LessonListDto> wishListAll(User userNo) {


        System.out.println(userNo);

        List<StudentWishlist> studentWishlist = studentWishlistRepository.findAllByUserNo(userNo);

        System.out.println(studentWishlist.toString());

        List<LessonListDto> wishLessonList = new ArrayList<>();


        for (StudentWishlist sw : studentWishlist) {

            LessonListDto lessonListDto = new LessonListDto();

            Lesson wishLesson = lessonRepository.findByLessonNo(sw.getLessonNo().getLessonNo());


            // 리스트 넣기
            lessonListDto.setLessonTypeName(wishLesson.getLessonTypeNo().getLessonTypeName());
            lessonListDto.setLessonName(wishLesson.getLessonName());
            lessonListDto.setLessonPrice(wishLesson.getLessonPrice());
            lessonListDto.setUserName(wishLesson.getUserNo().getUserName());
            lessonListDto.setLessonStartDate(wishLesson.getLessonStartDate());
            lessonListDto.setLessonEndDate(wishLesson.getLessonEndDate());
            lessonListDto.setLessonThumbnailImg(wishLesson.getLessonThumbnailImg());
            lessonListDto.setMaxStudent(wishLesson.getMaxStudent());
            lessonListDto.setTotalStudent(wishLesson.getTotalStudent());

            wishLessonList.add(lessonListDto);

        }

        return wishLessonList;

    }

    // 학생 수강 목록 전체 출력
    public List<LessonListDto> userLessonAll(Long userNo) {
        User user = userRepository.findByUserNo(userNo);

        List<StudentLessonList> userlessonlist = studentLessonListRepository.findAllByUserNo(user);

        System.out.println(userlessonlist.toString());

        List<LessonListDto> clalist = new ArrayList<>();

        for (StudentLessonList lessonAll : userlessonlist) {

            LessonListDto cla = new LessonListDto();

            cla.setLessonStartDate(lessonAll.getLessonNo().getLessonStartDate());
            cla.setLessonEndDate(lessonAll.getLessonNo().getLessonEndDate());
            cla.setUserName(lessonAll.getLessonNo().getLessonName());

            clalist.add(cla);
        }

        return clalist;
    }

    public StudentAttendHomeworkDto getStudentAttendHomeworkInfo(Long userNo, Long lessonNo) throws IllegalAccessException {
        User user = userRepository.findByUserNo(userNo);
        if (user == null) {
            throw new IllegalAccessException("유효하지 않은 사용자입니다.");
        }
        StudentAttendHomeworkDto studentAttendHomework = new StudentAttendHomeworkDto();
        List<AttendHomeworkProjectionInterface> attendHomeworkList = lessonHomeworkRepository.getAttendHomeworkByUserNo(userNo, lessonNo);
        studentAttendHomework.setUserNo(user.getUserNo());
        studentAttendHomework.setUserName(user.getUserName());
        studentAttendHomework.setAttendHomeworkList(attendHomeworkList);
        return studentAttendHomework;
    }

    public List<HashMap<String, Object>> getLessonRoundFileInfo(Long lessonNo) {
        List<HashMap<String, Object>> lessonRoundfileInfo = new ArrayList<>();
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNo(lessonNo);
        for(LessonRound lessonRound : lessonRoundList){
            HashMap<String, Object> fileInfo = new HashMap<>();
            fileInfo.put("lessonRoundNo", lessonRound.getLessonRoundNo());
            fileInfo.put("lessonRoundNumber", lessonRound.getLessonRoundNumber());
            fileInfo.put("lessonRoundTitle", lessonRound.getLessonRoundTitle());
            fileInfo.put("lessonRoundFileName", lessonRound.getLessonRoundFileName());
            fileInfo.put("lessonRoundFileOriginName", lessonRound.getLessonRoundFileOriginName());
            lessonRoundfileInfo.add(fileInfo);
        }
        return lessonRoundfileInfo;
    }
}
