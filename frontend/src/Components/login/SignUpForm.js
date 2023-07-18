import React, {useState} from "react"
import axios from "axios"

const SignUpForm = () => {
    const [userType, setUserType] = useState('S') // char(1): 학생: S | 선생: T (기본은 학생)

    // ########################################## SignUpCommn #################
    const [userId, setUserId] = useState('') // 유저 아이디 : varchar(20)
    const [userName, setUserName] = useState('') // 사용자 이름: < varchar(30) / 3 >
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('') // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userPasswordCheck, setUserPasswordCheck] = useState('') // 비밀번호 확인 varchar(256) (임의)
    const [userTel, setUserTel] = useState('') // varchar(15) // 전화번호
    const [userInfo, setUserInfo] = useState('') // varchar(150) // 3 한마디 소개 (학생과 강사에 따라 달라짐)
    const [profileImg, setProfileImg] = useState('') // 보류! 프로필이미지 칸
    
    const [isActive, setIsActive] = useState(false) // 사용(true), 탈퇴(false) // 회원가입 버튼을 클릭하면 'true'로 바꾸기!
    
    // ########################################## SignUpCommn #################


    const signUpHandler = () => {
        const data = {
            userId,
            userName,
            userPassword, // 안녕하세요1@
            userPasswordCheck, // 안녕하세요1@
            userTel,
            userInfo,
            userType,
            isActive
        }
        console.log(data)
        axios.post("", data)
    }
    
    return (
        <form onSubmit={(e)=>e.preventDefault()}>
            {/* 여기도 Form 전용 */}
            <input type="text" placeholder="id" onChange={(e)=> setUserId(e.target.value)}/>
            <input type="password" placeholder="password 1" onChange={(e)=> setUserPassword(e.target.value)}/>
            <input type="paasword" placeholder="password 2" onChange={(e)=> setUserPasswordCheck(e.target.value)}/>
            <input type="text" placeholder="전화번호" onChange={(e)=> setUserTel(e.target.value)}/>
            <input type="text" placeholder="이메일" onChange={(e)=> setUserEmail(e.target.value)}/>
            <input type="text" placeholder="소개" onChange={(e)=> setUserInfo(e.target.value)}/>
            {/* <input type="text" placeholder="소개"/> */}

            {/* 여기 Form 전용 공통 */}
            <button onClick={()=> signUpHandler()}>회원가입</button>
        </form>
    )
}

export default SignUpForm