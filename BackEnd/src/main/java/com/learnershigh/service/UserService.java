package com.learnershigh.service;


import com.learnershigh.domain.EduCareer;
import com.learnershigh.domain.JobCareer;
import com.learnershigh.domain.User;
import com.learnershigh.dto.EduDto;
import com.learnershigh.dto.JobDto;
import com.learnershigh.dto.JoinDto;
import com.learnershigh.repository.EduRepository;
import com.learnershigh.repository.JobRepository;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JobRepository jobCareerRepository;
    private final EduRepository eduRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입 (유저 정보 insert)
    public User userJoin(JoinDto joinDto) {
        User user = new User();

        // 아이디 중복 검사
        if (!duplicateId(joinDto.getUserId())) {

            throw new IllegalStateException("아이디가 중복됩니다.");
        }
        if (!checkName(joinDto.getUserName())) {
            throw new IllegalStateException("이름이 유효하지 않습니다.");
        }

//        // 이메일 유효성 검사
//        if (!Pattern.matches("\t^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", joinDto.getUserEmail())) {
//            throw new IllegalStateException("이메일 형식을 다시 맞춰주세요.");
//        }

        // 비밀번호 유효성 검사
//        if (!Pattern.matches("^(?=.*[a-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[a-z\\d~!@#$%^&*()+|=]{9,16}$", joinDto.getUserPassword())) {
//            throw new IllegalStateException("비밀번호 형식이 맞지않습니다.");
//        }

//
//        // 전화번호 유효성 검사
//        if (!Pattern.matches("^01(?:0|1|[6-9])-(?:\\\\d{3}|\\\\d{4})-\\\\d{4}$", joinDto.getUserTel())) {
//            throw new IllegalStateException("전화번호 형식이 맞지않습니다.");
//        }

        // 한마디 글자수 유효성 검사
        if (!checkInfo(joinDto.getUserInfo())) {
            throw new IllegalStateException("글자수가 50개를 넘었습니다.");
        }

        user.setUserId(joinDto.getUserId());
        System.out.println("아이디 :" + joinDto.getUserId());
        user.setUserName(joinDto.getUserName());
        user.setUserEmail(joinDto.getUserEmail());

        // 해시값으로 DB에 넣음.
        String encodePassword = passwordEncoder.encode(joinDto.getUserPassword());
        user.setUserPassword(encodePassword);
        user.setUserTel(joinDto.getUserTel());
        user.setUserInfo(joinDto.getUserInfo());
        user.setProfileImg(joinDto.getProfileImg());

        return userRepository.save(user); // 저장한 객체를 반환함.

    }

    // 아이디 중복 값 검사
    public boolean duplicateId(String userid) {

        User user = userRepository.findByUserId(userid);

        if (user == null) {
            // 중복된 아이디가 없다면 true
            return true;
        } else {
            // 중복된 아이디가 있으면 false
            return false;
        }

    }

    // 이름 글자수 제한 검사 (length = 10 제한)
    public boolean checkName(String userName) {

        if (userName.length() > 0 && userName.length() <= 10) {
            // 글자수가 10개 이하면 true
            return true;
        } else {
            // 글자수가 10개 이상이면 false
            return false;
        }

    }

    // 한마디 글자수 제한 검사 (length = 50 제한)
    public boolean checkInfo(String userInfo) {


        if (userInfo.length() > 0 && userInfo.length() <= 50) {
            // 글자수가 50개 이하면 true
            return true;
        } else {
            // 글자수가 50개 이상이면 false
            return false;
        }

    }

    // 경력 정보 insert
    public JobCareer jobJoin(JobDto jobDto){
        JobCareer jobCareer = new JobCareer();

        jobCareer.setCompanyName(jobDto.getCompanyName());
        jobCareer.setDepartName(jobDto.getDepartName());
        jobCareer.setHireStartDate(jobDto.getHireStartDate());
        jobCareer.setHireEndDate(jobDto.getHireEndDate());

        return jobCareerRepository.save(jobCareer);
    }

    // 학위 정보 insert

    public EduCareer eduJoin(EduDto eduDto){
        EduCareer eduCareer = new EduCareer();

        eduCareer.setUniversityName(eduDto.getUniversityName());
        eduCareer.setMajorName(eduDto.getMajorName());
        eduCareer.setDegree(eduDto.getDegree());
        eduCareer.setEduStartDate(eduDto.getEduStartDate());
        eduCareer.setEduEndDate(eduDto.getEduEndDate());

        return eduRepository.save(eduCareer);
    }

}
