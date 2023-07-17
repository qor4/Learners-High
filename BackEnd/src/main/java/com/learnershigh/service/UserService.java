package com.learnershigh.service;


import com.learnershigh.domain.User;
import com.learnershigh.dto.JoinDto;
import com.learnershigh.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // 회원가입 (유저 정보 insert)
    public User userjoin(JoinDto joinDto){
        User user = new User();

        user.setUserId(joinDto.getUserId());
        user.setUserName(joinDto.getUserName());
        user.setUserEmail(joinDto.getUserEmail());
        user.setUserPassword(joinDto.getUserPassword());
        user.setUserTel(joinDto.getUserTel());
        user.setUserInfo(joinDto.getUserInfo());
        user.setProfileImg(joinDto.getProfileImg());

        return userRepository.save(user); // 저장한 객체를 반환함.

    }

    // 아이디 중복 값 검사
    public boolean duplicateId(String userid){

        User user = userRepository.findByUserId(userid);

        if(user.getUserId().isEmpty()){
            return false;
        }
        else {
            return true;
        }

    }

    // 경력 정보 insert
//    public JobCareer jobjoin(JobDto jobDto){
//        JobCareer jobCareer = new JobCareer();
//
//        jobCareer.setCompanyName(jobDto.getCompanyName());
//        jobCareer.setDepartName(jobDto.getDepartName());
//        jobCareer.setHireStartDate(jobDto.getHireStartDate());
//        jobCareer.setHireEndDate(jobDto.setHireEndDate());
//    }

    // 학위 정보 insert







}
