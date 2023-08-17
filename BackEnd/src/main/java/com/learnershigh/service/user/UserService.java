package com.learnershigh.service.user;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnershigh.domain.user.EduCareer;
import com.learnershigh.domain.user.JobCareer;
import com.learnershigh.domain.OAuthToken;
import com.learnershigh.domain.user.User;
import com.learnershigh.dto.user.*;
import com.learnershigh.repository.user.EduRepository;
import com.learnershigh.repository.user.JobRepository;
import com.learnershigh.repository.user.UserRepository;
import com.learnershigh.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Join;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final JobRepository jobCareerRepository;
    private final EduRepository eduRepository;
    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;

    // 이메일로 userNo 뽑아내기
    public Long getUserNo(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);

        return user.getUserNo();
    }

    // 회원가입 (유저 정보 insert)
    @Transactional
    public User userJoin(JoinDto joinDto) {
        User user = new User();

        // 아이디 글자수 제한 ???
        if (!duplicateId(joinDto.getUserId())) {

            throw new IllegalStateException("아이디가 중복됩니다.");
        }

        if (!checkName(joinDto.getUserName())) {
            throw new IllegalStateException("이름이 유효하지 않습니다.");
        }
        // 이메일 유효성 검사
        if (!Pattern.matches("[0-9a-zA-Z]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$", joinDto.getUserEmail())) {
            throw new IllegalStateException("이메일 형식을 다시 맞춰주세요.");
        }

        if (!duplicateEmail(joinDto.getUserEmail())) {
            throw new IllegalStateException("이미 가입된 이메일 입니다.");
        }

        // 비밀번호 유효성 검사
        if (!Pattern.matches("^.*(?=^.{9,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$", joinDto.getUserPassword())) {
            throw new IllegalStateException("비밀번호 형식이 맞지않습니다.");
        }

        // 전화번호 유효성 검사
        if (!Pattern.matches("^\\d{11}$", joinDto.getUserTel())) {
            throw new IllegalStateException("전화번호 형식이 맞지않습니다.");
        }
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
        user.setUserType(joinDto.getUserType());
        user.setHowJoin("L");

        return userRepository.save(user); // 저장한 객체를 반환함.

    }

    @Transactional
    // 회원 탈퇴 (isactive = false)
    public Boolean userDelete(Long userNo) {

        User user = userRepository.findByUserNo(userNo);

        // 이미 컨텍스트에 올라와 있어서 내용이 다르면 알아서 update 됨.

        user.userDelete(false);

        return userRepository.findByUserNo(userNo).isActive();

    }

    // 비밀번호 변경 시 비밀번호 확인
    public Boolean pwdCheck(Long userNo, String passWord) {
        User user = userRepository.findByUserNo(userNo);

        if (!passwordEncoder.matches(passWord, user.getUserPassword())) {
            throw new IllegalStateException("잘못된 비밀번호입니다.");
        }

        return true;
    }


    // 비밀번호 변경
    @Transactional
    public Boolean pwdChange(String  userId, String passWord) {
        User user = userRepository.findByUserId(userId);

        // 비밀번호 유효성 검사
        if (!Pattern.matches("^.*(?=^.{9,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$", passWord)) {
            throw new IllegalStateException("비밀번호 형식이 맞지않습니다.");
        }


        // 해시값으로 DB에 넣음.
        String encodePassword = passwordEncoder.encode(passWord);
        user.setUserPassword(encodePassword);
//        user.pwdChange(encodePassword);


        return true;
    }

    @Transactional
    public HashMap<String, Object> kakaoUserJoin(String code) throws JsonProcessingException {


        System.out.println("들어오냐?");
        System.out.println(code);
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        params.add("grant_type", "authorization_code");
        params.add("client_id", "b6858c19fc043da6c74478b610af98a0");
        params.add("redirect_uri", "https://i9b105.p.ssafy.io/kakao/join");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입


        );

        System.out.println(response);

        ObjectMapper objectMapper = new ObjectMapper();

        OAuthToken oAuthToken = null;


        oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);

        System.out.println("카카오 엑세스 토큰:" + oAuthToken.getAccess_token());

        RestTemplate rt2 = new RestTemplate();

        HttpHeaders headers2 = new HttpHeaders();

        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers2.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoProfileRequest2, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입


        );


        ObjectMapper objectMapper2 = new ObjectMapper();
        KaKaoDto kaKaoDto = null;

        try {
            kaKaoDto = objectMapper2.readValue(response2.getBody(), KaKaoDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }


//         이메일 검사!!
        User checkuser = userRepository.findByUserEmail(kaKaoDto.getKakao_account().getEmail());
        System.out.println(checkuser);
        if (checkuser == null) {

            System.out.println("DB 에 없어");

            User person = new User();

            person.setUserEmail(kaKaoDto.getKakao_account().getEmail());
            person.setUserId(kaKaoDto.getId());
            person.setUserName(kaKaoDto.getProperties().getNickname());
            person.setProfileImg(kaKaoDto.getProperties().getThumbnail_image());

            // 이름과 아이디 섞은 해시값을 비밀번호로 설정함.
            String encodePassword = passwordEncoder.encode(kaKaoDto.getId() + kaKaoDto.getProperties().getNickname());
            person.setUserPassword(encodePassword);
            person.setHowJoin("K");
            System.out.println(encodePassword);

            userRepository.save(person);

            LoginDto loginDto = new LoginDto();
            loginDto.setUserId(person.getUserId());
            loginDto.setUserPassword(kaKaoDto.getId() + kaKaoDto.getProperties().getNickname());

            HashMap<String, Object> userInfo = userLogin(loginDto);

            return userInfo;

        } else if (checkuser != null && checkuser.getHowJoin().equals("K")) {
            LoginDto loginDto = new LoginDto();
            loginDto.setUserId(checkuser.getUserId());
            User user = userRepository.findByUserId(checkuser.getUserId());
            loginDto.setUserPassword(user.getUserId() + user.getUserName());

            userLogin(loginDto);

            HashMap<String, Object> userInfo = userLogin(loginDto);

            return userInfo;
        } else if (checkuser != null && checkuser.getHowJoin().equals("L")) {
            throw new IllegalStateException("일반 로그인으로 이미 회원가입이 존재합니다.");
        }

        return null;


    }


    // 로그인
    public HashMap<String, Object> userLogin(LoginDto loginDto) {
        HashMap<String, Object> userInfo = new HashMap<>();
        User user = userRepository.findByUserId(loginDto.getUserId());
        if (user == null || !user.isActive() || !passwordEncoder.matches(loginDto.getUserPassword(), user.getUserPassword())) {
            throw new BadCredentialsException("잘못된 계정정보입니다.");
        }

        TokenDto token = new TokenDto();
        token.setAccessToken(tokenProvider.createAccessToken(user.getUserId()));
        token.setRefreshToken(tokenProvider.createRefreshToken(user.getUserId()));
        userInfo.put("token", token);
        userInfo.put("userNo", user.getUserNo());
        userInfo.put("userName", user.getUserName());
        userInfo.put("userType", user.getUserType());
        userInfo.put("userId", user.getUserId());
        userInfo.put("userInfo", user.getUserInfo());
        userInfo.put("userEmail", user.getUserEmail());
        return userInfo;
    }

    // refresh 토큰으로 access, refresh 토큰 재발급
    public TokenDto refresh(TokenDto tokenDto) {
        TokenDto token = tokenProvider.validateRefreshToken(tokenDto.getRefreshToken());
        if (token == null) {
            throw new IllegalStateException("만료된 토큰입니다.");
        }
        return token;
    }

    // 카카오 로그인 시 이메일로 사용자 정보 비어있는 지 검사
    public void kakaoEmailCheck(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);
        if (user.getUserTel() == null) {

        } else {
            throw new IllegalStateException("정보가 꽉 차 있습니다.");
        }
    }


    // 카카오 로그인 이후 더 받을 정보들 받는 것.
    @Transactional
    public HashMap<String, Object> kakaoPlus(KakaoInfo kakaoInfo, String userEmail) {

        System.out.println("들어왔냐?");
        User user = userRepository.findByUserEmail(userEmail);

        // 전화번호 유효성 검사
        if (!Pattern.matches("^\\d{11}$", kakaoInfo.getUserTel())) {
            throw new IllegalStateException("전화번호 형식이 맞지않습니다.");
        }

        // 한마디 글자수 유효성 검사
        if (!checkInfo(kakaoInfo.getUserInfo())) {
            throw new IllegalStateException("글자수가 50개를 넘었습니다.");
        }

        user.setUserType(kakaoInfo.getUserType());
        user.setUserTel(kakaoInfo.getUserTel());
        user.setUserInfo(kakaoInfo.getUserInfo());

        User user1 = userRepository.save(user);

        LoginDto loginDto = new LoginDto();

        loginDto.setUserId(user1.getUserId());
        loginDto.setUserPassword(user.getUserId() + user.getUserName());

        return userLogin(loginDto); // 저장한 객체를 반환함.


    }

    // 아이디 중복 값 검사
    public boolean duplicateId(String userId) {

        User user = userRepository.findByUserId(userId);

        if (user == null) {
            // 중복된 아이디가 없다면 true
            return true;
        } else {
            // 중복된 아이디가 있으면 false
            return false;
        }

    }


    // 이메일 중복 값 검사
    public boolean duplicateEmail(String userEmail) {

        User user = userRepository.findByUserEmail(userEmail);

        if (user == null) {
            // 중복된 이메일이 없다면 true
            return true;
        } else {
            // 중복된 이메일이 있으면 false
            return false;
        }

    }

    // 이메일로 아이디 찾기
    public String SearchId(String userEmail) {

        User user = userRepository.findByUserEmail(userEmail);
        JoinDto joinDto = new JoinDto();

        joinDto.setUserId(user.getUserId());

        return joinDto.getUserId();


    }

    // 받아온 이메일과 아이디가 일치하는 사용자가 있는지 확인
    public Boolean searchPwd(String userId, String userEmail) {
        User user = userRepository.findByUserIdAndUserEmail(userId, userEmail);

        if (user != null) {
            return true;
        }
        return false;
    }


//    // 비밀번호 변경
//    @Transactional
//    public void pwdChange(String pwd, Long userNo) {
//
//        // 전화번호 유효성 검사
//        if (!Pattern.matches("^\\d{11}$", pwd)) {
//            throw new IllegalStateException("전화번호 형식이 맞지않습니다.");
//        }
//
//        User user = userRepository.findByUserNo(userNo);
//
//
//        // 이미 컨텍스트에 올라와 있어서 내용이 다르면 알아서 update 됨.
//        user.pwdChange(pwd);
//
//    }


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

    // 카카오 정보 DB에 넣기
//    public void kakaoinput(){
//
//    }

    // 강사 경력 정보 insert
    @Transactional
    public void jobJoin(JobDto jobDto, Long userNo) {
        JobCareer jobCareer = new JobCareer();


        jobCareer.setCompanyName(jobDto.getCompanyName());
        jobCareer.setDepartName(jobDto.getDepartName());
        jobCareer.setHireStartDate(jobDto.getHireStartDate());
        jobCareer.setHireEndDate(jobDto.getHireEndDate());
        jobCareer.setUserNo(userRepository.findByUserNo(userNo));


        jobCareerRepository.save(jobCareer);
    }

    // 강사 학위 정보 insert
    @Transactional
    public void eduJoin(EduDto eduDto, Long userNo) {
        EduCareer eduCareer = new EduCareer();

        eduCareer.setUniversityName(eduDto.getUniversityName());
        eduCareer.setMajorName(eduDto.getMajorName());
        eduCareer.setDegree(eduDto.getDegree());
        eduCareer.setEduStartDate(eduDto.getEduStartDate());
        eduCareer.setEduEndDate(eduDto.getEduEndDate());
        eduCareer.setUserNo(userRepository.findByUserNo(userNo));

        eduRepository.save(eduCareer);
    }


    // 마이페이지에 보일 유저 정보 추출

    public JoinDto mypageUser(Long userNo) {
        //System.out.println(userRepository.findByUserNo(userNo));
        User user = userRepository.findByUserNo(userNo);

        JoinDto joinDto = new JoinDto();

        joinDto.setUserId(user.getUserId());
        joinDto.setUserName(user.getUserName());
        joinDto.setUserEmail(user.getUserEmail());
        joinDto.setUserTel(user.getUserTel());
        joinDto.setUserInfo(user.getUserInfo());
        joinDto.setProfileImg(user.getProfileImg());

        return joinDto;
    }

    // 마이페이지 수정
    @Transactional
    public void mypageModify(Long userNo, JoinDto joinDto) {


        // 전화번호 유효성 검사
        if (!Pattern.matches("^\\d{11}$", joinDto.getUserTel())) {
            throw new IllegalStateException("전화번호 형식이 맞지않습니다.");
        }
        // 한마디 글자수 유효성 검사
        if (!checkInfo(joinDto.getUserInfo())) {
            throw new IllegalStateException("글자수가 50개를 넘었습니다.");
        }

        User user = userRepository.findByUserNo(userNo);


        // 이미 컨텍스트에 올라와 있어서 내용이 다르면 알아서 update 됨.
        user.mypageModify(joinDto.getUserName(), joinDto.getUserTel(), joinDto.getUserInfo());

    }

    // 강사 학위 전체 출력
    public List<EduDto> eduList(User userNo) {

        List<EduCareer> eduList = eduRepository.findAllByUserNoOrderByEduStartDateAsc(userNo);

        List<EduDto> eduDtoList = new ArrayList<>();

        for (EduCareer ec : eduList) {
            EduDto eduDto = new EduDto();

            eduDto.setEduCareerNo(ec.getEduCareerNo());
            eduDto.setUniversityName(ec.getUniversityName());
            eduDto.setMajorName(ec.getMajorName());
            eduDto.setDegree(ec.getDegree());
            eduDto.setEduStartDate(ec.getEduStartDate());
            eduDto.setEduEndDate(ec.getEduEndDate());

            eduDtoList.add(eduDto);


        }

        return eduDtoList;


    }

    // 강사 경력 전체 출력
    public List<JobDto> jobList(User userNo) {

        List<JobCareer> jobCareers = jobCareerRepository.findAllByUserNoOrderByHireStartDateAsc(userNo);


        List<JobDto> jobDtoList = new ArrayList<>();

        for (JobCareer ec : jobCareers) {
            JobDto jobDto = new JobDto();

            jobDto.setJobCareerNo(ec.getJobCareerNo());
            jobDto.setCompanyName(ec.getCompanyName());
            jobDto.setDepartName(ec.getDepartName());
            jobDto.setHireStartDate(ec.getHireStartDate());
            jobDto.setHireEndDate(ec.getHireEndDate());

            jobDtoList.add(jobDto);


        }
        return jobDtoList;
    }


    // 수정 버튼에 job_career_no가 있어야 함.
    // 강사 경력 수정
    @Transactional
    public void jobModify(Long jobCareerNo, JobDto jobDto) {

        JobCareer jobCareer = jobCareerRepository.findByJobCareerNo(jobCareerNo);


        // 이미 컨텍스트에 올라와 있어서 내용이 다르면 알아서 update 됨.
        jobCareer.jobModify(jobDto.getCompanyName(), jobDto.getDepartName(), jobDto.getHireStartDate(), jobDto.getHireEndDate());

    }

    // 수정 버튼에 edu_career_no가 있어야 함.
    // 강사 학력 수정
    @Transactional
    public void eduModify(Long eduCareerNo, EduDto eduDto) {

        EduCareer eduCareer = eduRepository.findByeduCareerNo(eduCareerNo);

        // 이미 컨텍스트에 올라와 있어서 내용이 다르면 알아서 update 됨.
        eduCareer.eduModify(eduDto.getUniversityName(), eduDto.getMajorName(), eduDto.getDegree(), eduDto.getEduStartDate(), eduDto.getEduEndDate());

    }

    // 삭제 버튼에 edu_career_no가 있어야 함.
    // 강사 학력 삭제
    @Transactional
    public void eduDelete(Long eduCareerNo) {
        EduCareer eduCareer = eduRepository.findByeduCareerNo(eduCareerNo);
        // System.out.println(eduCareer);


        eduRepository.delete(eduCareer);

    }

    // 삭제 버튼에 job_career_no가 있어야 함.
    // 강사 경력 삭제
    @Transactional
    public void jobDelete(Long jobCareerNo) {
        JobCareer jobCareer = jobCareerRepository.findByJobCareerNo(jobCareerNo);

        jobCareerRepository.delete(jobCareer);


    }


}
