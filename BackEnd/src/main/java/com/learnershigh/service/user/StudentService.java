package com.learnershigh.service.user;

import com.learnershigh.domain.lesson.Lesson;
import com.learnershigh.domain.lesson.LessonRound;
import com.learnershigh.domain.lesson.LessonType;
import com.learnershigh.domain.lessonhub.LessonAttend;
import com.learnershigh.domain.lessonhub.LessonHomework;
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
import com.learnershigh.repository.lesson.LessonTypeRepository;
import com.learnershigh.repository.lessonhub.LessonAttendRepository;
import com.learnershigh.repository.lessonhub.LessonHomeworkRepository;
import com.learnershigh.repository.lessonhub.StudentLessonListRepository;
import com.learnershigh.repository.lessonhub.StudentWishlistRepository;
import com.learnershigh.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BSONObject;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final LessonAttendRepository lessonAttendRepository;
    private final LessonTypeRepository lessonTypeRepository;


    public boolean isStudent(User user) {
        if (user == null) {
            return false;
        }
        if (user.getUserType().equals("S")) {
            return true;
        }
        return false;
    }

    public boolean isStudentLesson(User user, Long lessonNo) {
        Lesson lesson = new Lesson();
        lesson.setLessonNo(lessonNo);
        StudentLessonList studentLessonList = studentLessonListRepository.findByLessonNoAndUserNo(lesson, user);
        if (studentLessonList == null) {
            return false;
        }
        return true;
    }

    @Transactional
    public void wish(StudentLessonActionDto studentLessonActionDto) {
        StudentWishlist studentWishlist = new StudentWishlist();
        studentWishlist.setUserNo(userRepository.findByUserNo(studentLessonActionDto.getUserNo()));
        studentWishlist.setLessonNo(lessonRepository.findByLessonNo(studentLessonActionDto.getLessonNo()));

        studentWishlistRepository.save(studentWishlist);
    }

    public boolean isWish(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        StudentWishlist studentWishlist = studentWishlistRepository.findByUserNoAndLessonNo(userNo, lessonNo);
        if (studentWishlist != null) {
            return true;
        } else {
            return false;
        }
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
                lessonMainListDto.setLessonRoundStartDatetime(lessonRound.getLessonRoundStartDatetime());
                lessonMainListDto.setLessonRoundEndDatetime(lessonRound.getLessonRoundEndDatetime());
                lessonMainListDto.setLessonRoundLessonroom(lessonRound.getLessonRoundLessonroom());
                lessonListDtoMainList.add(lessonMainListDto);
            }
            data.put(i, lessonListDtoMainList);
        }
        return data;
    }

    // 학생 찜 목록 전체 출력
    public List<LessonListDto> wishListAll(User userNo) {
        List<StudentWishlist> studentWishlist = studentWishlistRepository.findAllByUserNo(userNo);
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
            lessonListDto.setMaxStudent(wishLesson.getMaxStudent());
            lessonListDto.setTotalStudent(wishLesson.getTotalStudent());
            lessonListDto.setUserNo(wishLesson.getUserNo().getUserNo());
            lessonListDto.setLessonNo(wishLesson.getLessonNo());

            wishLessonList.add(lessonListDto);

        }

        return wishLessonList;

    }

    // 학생 수강 목록 전체 출력
    public List<LessonListDto> userLessonAll(Long userNo, String status) {
        User user = userRepository.findByUserNo(userNo);
        List<StudentLessonList> userlessonlist;
        if (status.equals("강의 완료")) {
            userlessonlist = studentLessonListRepository.findAllByUserNoAndStatusEnd(user, status);
        } else {
            userlessonlist = studentLessonListRepository.findAllByUserNoAndStatusStart(user, status);
        }
        List<LessonListDto> clalist = new ArrayList<>();

        for (StudentLessonList lessonAll : userlessonlist) {

            LessonListDto cla = new LessonListDto();

            cla.setLessonStartDate(lessonAll.getLessonNo().getLessonStartDate());
            cla.setLessonEndDate(lessonAll.getLessonNo().getLessonEndDate());
            cla.setLessonName(lessonAll.getLessonNo().getLessonName());
            cla.setUserName(lessonAll.getLessonNo().getUserNo().getUserName());
            cla.setLessonNo(lessonAll.getLessonNo().getLessonNo());
            cla.setLessonTypeName(lessonAll.getLessonNo().getLessonTypeNo().getLessonTypeName());

            clalist.add(cla);
        }
        return clalist;
    }

    public LessonRound isEnterLessonroom(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isStudentLesson(user, lessonNo)) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
        return lessonRoundRepository.isEnterLessonroom(lessonNo);
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
        for (LessonRound lessonRound : lessonRoundList) {
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

    public void getStudentLessonState(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (user == null) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!user.getUserType().equals("S")) {
            throw new IllegalStateException("학생만 수강 신청이 가능합니다.");
        }
        Lesson lesson = lessonRepository.findByLessonNo(lessonNo);
        if (lesson == null) {
            throw new IllegalStateException("유효하지 않은 수업입니다.");
        }
        StudentLessonList studentLesson = studentLessonListRepository.findByLessonNoAndUserNo(lesson, user);
        if (studentLesson != null) {
            throw new IllegalStateException("이미 수강 신청한 수업입니다.");
        }
    }

    public Object getAttendRate(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isStudentLesson(user, lessonNo)) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNoAndLessonRoundEndTimeBefore(lessonNo, LocalDateTime.now());
        List<LessonAttend> lessonAttendList = lessonAttendRepository.findByUserNoAndLessonRoundNoIn(user, lessonRoundList);

        if (lessonAttendList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }

        double attendCnt = 0.0;
        double absentCnt = 0.0;
        for (LessonAttend lessonAttend : lessonAttendList) {
            if (lessonAttend.getLessonAttendStatus().equals("출석")) {
                attendCnt++;
            } else {
                absentCnt++;
            }
        }
        double result = attendCnt / (absentCnt + attendCnt) * 100;
        return result;
    }

    public Object getHomeworkRate(Long userNo, Long lessonNo) {
        User user = userRepository.findByUserNo(userNo);
        if (!isStudent(user)) {
            throw new IllegalStateException("유효하지 않은 사용자입니다.");
        }
        if (!isStudentLesson(user, lessonNo)) {
            throw new IllegalStateException("수강하지 않는 수업입니다.");
        }
        LocalDateTime now = LocalDateTime.now();
        List<LessonRound> lessonRoundList = lessonRoundRepository.findByLessonNoAndLessonRoundEndTimeBefore(lessonNo, now);
        if (lessonRoundList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }
        LessonRound lessonRound = lessonRoundRepository.findByLessonRoundNumberAndLessonRoundNumber(lessonNo, lessonRoundList.get(lessonRoundList.size() - 1).getLessonRoundNumber() + 1);
        if (lessonRound != null && lessonRound.getLessonRoundStartDatetime().isBefore(now)) {
            int deleteIndex = lessonRoundList.size() - 1;
            lessonRoundList.remove(deleteIndex);
        }
        List<LessonHomework> lessonHomeworkList = lessonHomeworkRepository.findByUserNoAndLessonRoundNoIn(user, lessonRoundList);
        double submissionCnt = 0.0;
        double unsubmittedCnt = 0.0;
        if (lessonHomeworkList.size() == 0) {
            return "아직 집계할 데이터가 없습니다.";
        }

        for (LessonHomework lessonHomework : lessonHomeworkList) {
            if (lessonHomework.getHomeworkStatus().equals("제출")) {
                submissionCnt++;
            } else {
                unsubmittedCnt++;
            }
        }
        double result = submissionCnt / (submissionCnt + unsubmittedCnt) * 100;
        return result;
    }

    // 한 학생에 대한 수업 분류의 갯수
    public HashMap<String, Integer> lessonTypeCnt(Long userNo) {


        HashMap<String, Integer> map = new HashMap<>();


        User user = userRepository.findByUserNo(userNo);

        System.out.println(user.toString());

        List<StudentLessonList> lessonLists = studentLessonListRepository.findAllByUserNo(user);

        if(lessonLists == null){
            throw new IllegalStateException("수강하는 강의가 없습니다.");
        }


        for (StudentLessonList sl : lessonLists) {

            System.out.println(sl.getLessonNo());

            Lesson lesson = lessonRepository.findByLessonNo(sl.getLessonNo().getLessonNo());


            LessonType lessonType = lessonTypeRepository.findByLessonTypeNo(lesson.getLessonTypeNo().getLessonTypeNo());


            map.put(lessonType.getLessonTypeName(), map.getOrDefault(lessonType.getLessonTypeName(), 0) + 1);
        }


        return map;

    }

}
