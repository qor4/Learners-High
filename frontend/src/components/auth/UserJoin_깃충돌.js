<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
=======
import React, {useState, useEffect} from "react";

import axios from 'axios'
>>>>>>> 267f4ce8d1721b51bafdbc4b5c2896c519b095a8
import { url } from "../../api/APIPath";
import { useNavigate } from 'react-router-dom';

import UserJoinTeacherJob from "./UserJoinTeacherJob"
import UserJoinTeacherEdu from "./UserJoinTeacherEdu"


const UserJoin = () => {
    const [userType, setUserType] = useState("S");
    const [userId, setUserId] = useState(""); // 유저 아이디 : varchar(20)
    const [userName, setUserName] = useState(""); // 사용자 이름: < varchar(30) / 3 >
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState(""); // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userPasswordCheck, setUserPasswordCheck] = useState(""); // 비밀번호 확인 varchar(256) (임의)
    const [userTel, setUserTel] = useState(""); // varchar(15) // 전화번호
    const [userInfo, setUserInfo] = useState(""); // varchar(150) // 3 한마디 소개 (학생과 강사에 따라 달라짐)
    const [profileImg, setProfileImg] = useState(""); // null 허용 & 강사만 들어갈 것.

    // const initialInputData = {
    //   userType: "",
    //   userId: "",
    //   userName: "",
    //   userEmail: "",
    //   userPassword: "",
    //   userPasswordCheck: "",
    //   userTel: "",
    //   userInfo: ""
    // }
    // const initialMSGs = {
    //   userIdMSG: "",
    //   userNameMSG: "",
    //   userEmailMSG: "",
    //   userPasswordMSG: "",
    //   userPasswordCheckMSG: "",
    //   userTelMSG: "",
    //   userInfoMSG: "",
    // }
    // const initialValidates = {
    //   userIdValid: false,
    //   userNameValid: false,
    //   userEmailValid: false,
    //   userPasswordValid: false,
    //   userTelValid: false,
    //   userInfoValid: false
    // }
    // const [userInputs, setUserInputs] = useState(initialInputData)
    // const [MSGs, setMSGs] = useState(initialMSGs)
    // const [validates, setVaildates] = useState(initialValidates)

    // #### 공통 사용 #####
    // 모든 공백 제거 함수
    const removeAllEmpty = (value) => value.replace(/ /g, "");
    const numberPattern = /[0-9]/;
    const stringPattern = /[a-zA-Z]/;
    const specialPattern = /[~!@#$%^&*()-_+|<>?:{}]/;

    // 공백 자체를 입력 안 시키기 ~ 추후 과제

    const [idMSG, setIdMSG] = useState("");
    const [idValidCheck, setIdValidCheck] = useState(false);

    const idCheck = (e) => {
        let tmpId = e.currentTarget.value;
        // 1. id 길이 (tmp) 4~30(상한은 확실) id 특수문자 등 형식.

        // idMSG = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.

<<<<<<< HEAD
        let pattern3 = /[_-]/;
        // 아이디 글자 수
        if (tmpId.length === 0) {
            setIdMSG("아이디를 입력해 주세요.");
            setIdValidCheck(false);
            return;
        } else if (tmpId.length < 4 || tmpId.length > 20) {
            setIdMSG("아이디를 4자 이상 20자 이하로 입력해 주세요.");
            setIdValidCheck(false);
            return;
        } else if (
            !numberPattern.test(tmpId) &&
            !stringPattern.test(tmpId) &&
            !pattern3.test(tmpId)
        ) {
            setIdMSG("알파벳, 특수문자(_, -), 숫자로만 입력해 주세요");
            setIdValidCheck(false);
            return;
=======
    // 2. id 중복확인
    // idMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
    axios.get(`${url}/user/duplicate/id/${userId}`)
      .then((response) => {
        console.log(response)
          if (response.data.resultCode === 0) {
            setIdMSG('중복된 아이디입니다.')
            setIdValidCheck(false)
            return
>>>>>>> e181308 ([FE] feat: axios 요청)
        }

        // 2. id 중복확인
        // idMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
        axios.get(`${url}/user/duplicate/id/${userId}`).then((response) => {
            if (response.data.resultCode !== 0) {
                setIdMSG("중복된 아이디입니다.");
                setIdValidCheck(false)
                return;
            }
        });

        setIdMSG("");
        setIdValidCheck(true);
    };

    const [passwordMSG, setPasswordMSG] = useState("");
    const [passwordValidCheck, setPasswordVailidCheck] = useState(false);
    const passwordFormCheck = (e) => {
        const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
        const pattern3 = /[~!@#$%^&*()-_+|<>?:{}]/;
        if (userPassword.length === 0) {
            setPasswordMSG("공백 제외하고 비밀번호를 입력해 주세요.");
            setPasswordVailidCheck(false);

<<<<<<< HEAD
            return;
        } else if (
            !pattern1.test(userPassword) ||
            !pattern2.test(userPassword) ||
            !pattern3.test(userPassword) ||
            userPassword.length < 9 ||
            userPassword.length > 16
        ) {
            setPasswordMSG(
                "비밀번호는 숫자, 특수문자 포함 9~16자로 작성해주세요."
            );
            setPasswordVailidCheck(false);
            return;
=======
  const [userNameMSG, setUserNameMSG ] = useState('')
  const [userNameValidCheck, setUserNameValidCheck] = useState(false)
  const userNameFormCheck = (e) => {
    // let userName = e.currentTarget.value
    if (userName.length>10 || userName.length===0) {
      setUserNameMSG("10자 이내로 입력해 주세요.")
      setUserNameValidCheck(false)
      return
    }
    setUserNameValidCheck(true)
    setUserNameMSG("")
  }

  const [userTelMSG, setUserTelMSG ] = useState('')
  const [userTelValidCheck, setUserTelValidCheck] = useState(false)
  const userTelFormCheck = (e) => {
    console.log(userTel, userTelValidCheck)
    const pattern1 = /[0-9]/;
    if (!pattern1.test(userTel)) {
      setUserTelMSG("숫자만 입력해 주세요.")
      setUserTelValidCheck(false)
      // setUserTel("")
      return
    } else if (userTel.length !== 11){
      setUserTelMSG("전화번호를 입력해주세요.")
      setUserTelValidCheck(false)
      // setUserTel("")
      return
    }
    // 일단 빼놓기. 전화번호 형식 입력했어. 근데 다시 돌아올땐 이녀석이 false로
    // setUserTel(userTel.replace('/-/g','').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    setUserTelMSG("")
    setUserTelValidCheck(true)
  }

  const [userEmailMSG, setUserEmailMSG] = useState('')
  const [userEmailValidCheck, setUserEmailVailidCheck] = useState(false)
  const userEmailFormCheck = (e) => {
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!pattern.test(userEmail)) {
      setUserEmailMSG("형식이 맞지 않습니다.")
      setUserEmailVailidCheck(false)
      return
    }
    // 2. 이메일 중복확인
    // idMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
    axios.get(`${url}/user/duplicate/email/${userEmail}`)
      .then((response) => {
          console.log(response.data)
          if (response.data.resultCode === 0) {
            setUserEmailMSG('중복된 이메일입니다.')
            setUserEmailVailidCheck(false)
            return
>>>>>>> e181308 ([FE] feat: axios 요청)
        }
        setPasswordMSG("");
    };

    const passwordDuplicateCheck = (e) => {
        if (userPassword !== userPasswordCheck) {
            setPasswordMSG("비밀번호가 일치하지 않습니다.");
            setPasswordVailidCheck(false);
            return;
        }
        setPasswordVailidCheck(true);
    };

    const [userNameMSG, setUserNameMSG] = useState("");
    const [userNameValidCheck, setUserNameValidCheck] = useState(false);
    const uqserNameFormCheck = (e) => {
        // let userName = e.currentTarget.value
        if (userName.length > 10 || userName.length === 0) {
            setUserNameMSG("10자 이내로 입력해 주세요.");
            setUserNameValidCheck(false);
            return;
        }
        setUserNameValidCheck(true);
        setUserNameMSG("");
    };

    const [userTelMSG, setUserTelMSG] = useState("");
    const [userTelValidCheck, setUserTelValidCheck] = useState(false);
    const userTelFormCheck = (e) => {
        console.log(userTel, userTelValidCheck);
        const pattern1 = /[0-9]/;
        if (!pattern1.test(userTel)) {
            setUserTelMSG("숫자만 입력해 주세요.");
            setUserTelValidCheck(false);
            // setUserTel("")
            return;
        } else if (userTel.length !== 11) {
            setUserTelMSG("전화번호를 입력해주세요.");
            setUserTelValidCheck(false);
            // setUserTel("")
            return;
        }
        // 일단 빼놓기. 전화번호 형식 입력했어. 근데 다시 돌아올땐 이녀석이 false로
        // setUserTel(userTel.replace('/-/g','').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
        setUserTelMSG("");
        setUserTelValidCheck(true);
    };

<<<<<<< HEAD
    const [userEmailMSG, setUserEmailMSG] = useState("");
    const [userEmailValidCheck, setUserEmailVailidCheck] = useState(false);
    const userEmailFormCheck = (e) => {
        const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!pattern.test(userEmail)) {
            setUserEmailMSG("형식이 맞지 않습니다.");
            setUserEmailVailidCheck(false);
            return;
        }
        // 2. id 중복확인
        // idMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
        axios
            .get(`${url}/user/duplicate/email/${userEmail}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.resultCode !== 0) {
                    setUserEmailMSG("중복된 이메일입니다.");
                    setUserEmailVailidCheck(false);
                    return;
                }
            });

        setUserEmailMSG("");
        setUserEmailVailidCheck(true);
    };

    // const [userInfoLabel, setUserInfoLabel] = useState('목표/다짐')
    // if (userType==="T") {
    //   setUserInfoLabel('강사 소개')
    // } else if (userType==="S") {
    //   setUserInfoLabel('목표/다짐')
    // }

    const [userInfoMSG, setUserInfoMSG] = useState("");
    const [userInfoValidCheck, setUserInfoValidCheck] = useState(false);
    const userInfoFormCheck = () => {
        if (userInfo.length !== 0 && userInfo.length < 51) {
            setUserInfoMSG("");
            setUserInfoValidCheck(true);
        } else {
            setUserInfoMSG("50자 이내로 작성해주세요.");
            setUserInfoValidCheck(false);
        }
    };

    const signUp = () => {
        if (
            userType &&
            idValidCheck &&
            passwordValidCheck &&
            userTelValidCheck &&
            userEmailValidCheck &&
            userEmailValidCheck &&
            userInfoValidCheck &&
            userNameValidCheck
        ) {
            alert("성공!");
            const data = JSON.stringify({
                userType,
                userId,
                userPassword,
                userEmail,
                userName,
                userTel,
                userInfo,
            });
            console.log(data);
            console.log(url);
            axios
                .post(`${url}/user/join`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        alert("회원가입 성공");
                    }
                });
        } else {
            alert("유효하지 않은 형식이 있습니다.");
        }
    };

    const userTypeChangeS = (e) => {
        if (userType !== "S") {
            setUserType("S");
        }
    };
    const userTypeChangeT = (e) => {
        if (userType !== "T") {
            setUserType("T");
        }
    };

    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <button className="student" onClick={userTypeChangeS} value="S">
                    학생
                </button>
                <button className="teacher" onClick={userTypeChangeT}>
                    선생님
                </button>
            </div>

            {/* <div>
        <label htmlFor="student">학생</label>
        <input type="radio"
        id="student"
        name="student"
        value="S"
        checked={userType.current==="S"}
        onChange={userTypeChange}
        />
        <label htmlFor="teacher">선생님</label>
        <input type="radio"
        id="teacher"
        name="teacher"
        value="T"
        checked={userType.current==="T"}
        onChange={userTypeChange}
        />
      </div> */}
            <div>
                <div>
                    <label htmlFor="userId">아이디: </label>
                    <input
                        type="text"
                        value={userId}
                        name="userId"
                        id="userId"
                        placeholder="아이디를 입력해 주세요."
                        onChange={(e) =>
                            setUserId(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={idCheck}
                    />
                    {/* 첫 렌더링엔 idMSG none */}
                    {idMSG ? <p>{idMSG}</p> : ""}
                </div>
                <label htmlFor="userPassword">비밀번호: </label>
                <input
                    type="password"
                    // value={userPassword}
                    name="userPassword"
                    id="userPassword"
                    placeholder="비밀번호: 특수문자 포함 9~16자로 입력해 주세요."
                    onChange={(e) =>
                        setUserPassword(removeAllEmpty(e.currentTarget.value))
                    }
                    onBlur={passwordFormCheck}
                />
                <label htmlFor="userPasswordCheck">비밀번호 확인: </label>
                <input
                    type="password"
                    // value={userPasswordCheck}
                    name="userPasswordCheck"
                    id="userPasswordCheck"
                    placeholder=""
                    onChange={(e) =>
                        setUserPasswordCheck(
                            removeAllEmpty(e.currentTarget.value)
                        )
                    }
                    onBlur={passwordDuplicateCheck}
                />
                <p> {passwordMSG} </p>
                <label htmlFor="userEmail">이메일: </label>
                <input
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    placeholder="*@*"
                    onChange={(e) =>
                        setUserEmail(removeAllEmpty(e.currentTarget.value))
                    }
                    onBlur={userEmailFormCheck}
                />
                <p> {userEmailMSG} </p>
=======
  const signUp = () => {
    if (userType && idValidCheck && passwordValidCheck && userTelValidCheck && userEmailValidCheck && userEmailValidCheck &&
      userInfoValidCheck && userNameValidCheck ) {
        alert("성공!")
        const data = JSON.stringify( {
          userType, userId, userPassword, userEmail, userName, userTel, userInfo
        } )
        console.log(data)
        console.log(url)
        axios.post(`${url}/user/join`,
        data,
        {headers: {"Content-Type": 'application/json'}})
        .then(res=> {
          if(res.data.resultCode === 0) {
            alert("회원가입 성공")
            
          }
        }) 
      } else {
        alert("유효하지 않은 형식이 있습니다.")
      }
  }
  
  const userTypeChangeS = (e) => {
    if (userType !== 'S') {
      setUserType("S")
    }
  }
  const userTypeChangeT = (e) => {
    if (userType !== 'T') {
      setUserType("T")
    }
  }
  return (
    <>
    <form onSubmit={e => e.preventDefault()}> 
      <div>
        <button className="student" onClick={userTypeChangeS} value="S">
          학생
        </button>
        <button className="teacher" onClick={userTypeChangeT} value="T">
          선생님
        </button>
      </div>
      
      <div>
        <div>
          <label htmlFor="userId">아이디: </label>
          <input 
          type="text"
          value={userId}
          name="userId" 
          id="userId"
          placeholder="아이디를 입력해 주세요."
          onChange={(e)=>setUserId( removeAllEmpty(e.currentTarget.value))}
          onBlur={idCheck}
          />
          {/* 첫 렌더링엔 idMSG none */}
          { idMSG ? <p>{idMSG}</p> : ""} 
>>>>>>> 267f4ce8d1721b51bafdbc4b5c2896c519b095a8

                <label htmlFor="userName">이름: </label>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="10자 이내로 입력해주세요."
                    onChange={(e) =>
                        setUserName(removeAllEmpty(e.currentTarget.value))
                    }
                    onBlur={userNameFormCheck}
                />
                <p>{userNameMSG}</p>

                <label htmlFor="userTel">전화번호: </label>
                <input
                    type="text"
                    name="userTel"
                    id="userTel"
                    value={userTel}
                    placeholder="숫자만 입력해 주세요(01012345678)"
                    onChange={(e) =>
                        setUserTel(removeAllEmpty(e.currentTarget.value))
                    }
                    onBlur={userTelFormCheck}
                />
                <p>{userTelMSG}</p>

                {/* <label htmlFor="userInfo">{userInfoLabel}: </label> */}
                <textarea
                    type="text"
                    name="userInfo"
                    id="userInfo"
                    placeholder="소개"
                    onChange={(e) => setUserInfo(e.currentTarget.value)}
                    onBlur={userInfoFormCheck}
                />
                <p> {userInfoMSG} </p>
            </div>
            <button onClick={signUp}>회원가입</button>
        </form>

<<<<<<< HEAD
=======
          {/* <label htmlFor="userInfo">{userInfoLabel}: </label> */}
          <textarea 
          type="text" 
          name="userInfo"
          id="userInfo"
          placeholder="소개" 
          onChange={(e)=> setUserInfo(e.currentTarget.value)}
          onBlur={userInfoFormCheck}
          />
          <p> {userInfoMSG} </p>
      </div>
      <button onClick={signUp}>회원가입</button>
    </form>

>>>>>>> 267f4ce8d1721b51bafdbc4b5c2896c519b095a8
    {/* 여기서 userType이 "T"면,  */}
    {
      userType==='T' ? (
        [<UserJoinTeacherJob key="0"></UserJoinTeacherJob>,
        <UserJoinTeacherEdu key="1"></UserJoinTeacherEdu>]
      ) : null
    }
    </>
  )
}
export default UserJoin;
